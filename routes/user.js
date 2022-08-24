const userRouter = require("express").Router();
const {
  registerForAdmin,
  loginForAdmin,
  registerForClient,
} = require("../controllers/user");

userRouter.post("/admin/register", registerForAdmin);
userRouter.post("/admin/login", loginForAdmin);
userRouter.post("/client/register", registerForClient);
module.exports = userRouter;
