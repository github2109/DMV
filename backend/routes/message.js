const messageRouter = require("express").Router();
const {
  sendMessageFromAdmin,
  sendMessageFromClient,
  getMessageByDeviceId,
} = require("../controllers/message");

messageRouter.post("/client/:deviceId", sendMessageFromClient);
messageRouter.post("/admin/:deviceId", sendMessageFromAdmin);
messageRouter.get("/:deviceId", getMessageByDeviceId);

module.exports = messageRouter;
