const userRouter = require("express").Router();
const {
  registerForAdmin,
  loginForAdmin,
  registerForClient,
  getListClientForMessenger,
  getClientByDeviceId,
} = require("../controllers/user");
const middlwares = require("../utils/middleware");

userRouter.post("/admin/register", registerForAdmin);
userRouter.post("/admin/login", loginForAdmin);
userRouter.post("/client/register", registerForClient);
userRouter.get("/client/messenger",middlwares.authAdmin, getListClientForMessenger);
userRouter.get("/client/:deviceId", getClientByDeviceId);
module.exports = userRouter;
