const userRouter = require("express").Router();
const {
  registerForAdmin,
  loginForAdmin,
  registerForClient,
  getListClientForMessenger,
  getClientByDeviceId,
} = require("../controllers/user");

userRouter.post("/admin/register", registerForAdmin);
userRouter.post("/admin/login", loginForAdmin);
userRouter.post("/client/register", registerForClient);
userRouter.get("/client/messenger", getListClientForMessenger);
userRouter.get("/client/:deviceId", getClientByDeviceId);
module.exports = userRouter;
