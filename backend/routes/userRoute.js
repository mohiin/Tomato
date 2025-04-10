
import express from "express";
import { checkUser, login, logout, signup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/check-user", checkUser);

export default userRouter;