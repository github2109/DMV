const userRouter = require("express").Router();
const { register } = require("../controllers/user");

userRouter.post("/register",register);

module.exports = userRouter;
