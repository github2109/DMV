const messageRouter = require("express").Router();
const {
  sendMessageFromAdmin,
  sendMessageFromClient,
  getMessageByDeviceId,
} = require("../controllers/message");
const middlwares = require("../utils/middleware");

messageRouter.post(
  "/client/:deviceId",
  middlwares.messageMiddleware,
  sendMessageFromClient
);
messageRouter.post(
  "/admin/:deviceId",
  middlwares.authAdmin,
  middlwares.messageMiddleware,
  sendMessageFromAdmin
);
messageRouter.get("/:deviceId/:page?", getMessageByDeviceId);
module.exports = messageRouter;
