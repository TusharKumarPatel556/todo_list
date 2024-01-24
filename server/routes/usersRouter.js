const express = require("express");

const { userRegister, userLogin } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/register-user", userRegister);
userRouter.get("/login-user", userLogin);

module.exports = userRouter;
