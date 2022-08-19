const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
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
      role: "Admin",
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
    if (user.role !== "Admin") {
      return res
        .status(500)
        .json({ message: "You are not allowed login to this role." });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.status(200).send({
      id: user._id,
      username: user.username,
      role: user.role,
      token: token,
      message: "Login successful",
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
      role: "Client",
      deviceId: deviceId,
    }).save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
