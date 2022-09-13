const User = require("../models/user");
const Message = require("../models/message");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { timeSince } = require("../helpers/formatDate");
exports.sendMessageFromClient = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const message = req.body;
    const user = await User.findOne({ deviceId: deviceId });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const messageSaved = await new Message({
      content: message.content,
      images: message.images,
      isAdminSending: false,
      client: user._id,
    }).save();
    user.recentMessage = messageSaved._id;
    await user.save();
    return res.status(200).json(messageSaved);
  } catch (error) {
    next(error);
  }
};
exports.sendMessageFromAdmin = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const deviceId = req.params.deviceId;
    const message = req.body;
    const user = await User.findOne({ deviceId: deviceId });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const messageSaved = await new Message({
      content: message.content,
      images: message.images,
      isAdminSending: true,
      client: user._id,
    });
    user.recentMessage = messageSaved._id;
    await user.save();
    return res.status(200).json(messageSaved);
  } catch (error) {
    next(error);
  }
};

exports.getMessageByDeviceId = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const user = await User.findOne({ deviceId: deviceId });
    if (!user) return res.status(400).json({ message: "User Not Found" });
    const message = await Message.find({ client: user._id }).sort({
      createdAt: 1,
    });
    let messageFormatDate = message.map((mess) => {
      return {
        ...mess.toObject(),
        createdAt:timeSince(mess.createdAt)
      };
    });
    return res.status(200).json(messageFormatDate);
  } catch (error) {
    next(error);
  }
};
