import express from "express";
import AuthController from "../controllers/AuthController";
import { catchAsync } from "../helpers/helper";

const authRoutes = express.Router();

// get routes
authRoutes.route("/login").get(catchAsync(AuthController.getLoginPage));
authRoutes.route("/signup").get(catchAsync(AuthController.getSignupPage));

// post routes
authRoutes.route("/login").post(catchAsync(AuthController.loginUser));
authRoutes.route("/signup").post(catchAsync(AuthController.registerUser));
authRoutes.route("/logout").post(catchAsync(AuthController.logout));

export default authRoutes;
