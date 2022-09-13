const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { timeSince } = require("../helpers/formatDate");
exports.registerForAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const check = await User.findOne({ username });
    if (check) {
      return res.status(500).json({
        message:
          "This username is already existed, try with a different username.",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      username,
      password: cryptedPassword,
      role: "ADMIN",
      deviceId: null,
    });
    const userSaved = await user.save();
    res.status(201).json(userSaved);
  } catch (error) {
    next(error);
  }
};

exports.loginForAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({ message: "Username not found" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(500)
        .json({ message: "Invalid credentials. Please try again." });
    }
    if (user.role !== "ADMIN") {
      return res
        .status(500)
        .json({ message: "You are not allowed login to this role." });
    }
    const token = generateToken(
      { id: user._id.toString(), role: user.role },
      "7d"
    );
    res.status(200).send({
      username: user.username,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerForClient = async (req, res, next) => {
  try {
    const { deviceId } = req.body;
    const user = await User.findOne({ deviceId });
    if (user)
      return res.status(500).json({ message: "User already registered." });
    const newUser = await new User({
      username: null,
      password: null,
      role: "CLIENT",
      deviceId: deviceId,
    }).save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.getListClientForMessenger = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const queryUser = User.aggregate([
      {
        $lookup: {
          from: "messages",
          localField: "recentMessage",
          foreignField: "_id",
          as: "recentMessage",
        },
      },
      {
        $unwind: "$recentMessage",
      },
      {
        $sort: { "recentMessage.createdAt": -1 },
      },
      {
        $project:{
          "deviceId":1,
          "recentMessage":1,
        }
      }
    ]);
    const users = await queryUser.exec();
    let userFormatDateMessage = users.map((user) => {
      const contentMess = user.recentMessage.content;
      return {
        ...user,
        recentMessage:{
          ...user.recentMessage,
          content: contentMess.length > 25 ? contentMess.slice(0,25) + "..." : contentMess,
          createdAt: timeSince(user.recentMessage.createdAt)
        }
      };
    });
    return res.status(200).json(userFormatDateMessage);
  } catch (error) {
    next(error);
  }
};

exports.getClientByDeviceId = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const { deviceId } = req.params;
    const client = await User.findOne({ deviceId: deviceId }).populate(
      "recentMessage"
    );
    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};
