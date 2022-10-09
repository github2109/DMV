const User = require("../models/user");
const Message = require("../models/message");
const { uploadImagesForMessage } = require("../services/upload");

exports.sendMessageFromClient = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const message = req.body;
    const user = await User.findOne({ deviceId: deviceId });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    let images =
      req.files && Object.values(req.files).flat().length > 0
        ? await uploadImagesForMessage(req.files)
        : [];
    const messageSaved = await new Message({
      content: message.content,
      images: images,
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
    const deviceId = req.params.deviceId;
    const message = req.body;
    const user = await User.findOne({ deviceId: deviceId });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    let images =
      req.files && Object.values(req.files).flat().length > 0
        ? await uploadImagesForMessage(req.files)
        : [];
    const messageSaved = await new Message({
      content: message.content,
      images: images,
      isAdminSending: true,
      client: user._id,
    }).save();
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
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
