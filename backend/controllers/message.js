const User = require("../models/user");
const Message = require("../models/message");

exports.sendMessageForClient = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const { message } = req.body;
    const user = await User.findOne({ deviceId: deviceId });
    if(!user){
        return res.status(400).json({ message: "User Not Found" });
    }
    const messageSaved = await new Message({
        content: message,
    })
  } catch (error) {
    next(error);
  }
};
