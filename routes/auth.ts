import express from "express";
import AuthController from "../controllers/AuthController";
import { catchAsync } from "../helpers/helper";

const authRoutes = express.Router();

// get routes
authRoutes.route("/login").get(catchAsync(AuthController.getLoginPage));

// post routes
authRoutes.route("/login").post(catchAsync(AuthController.loginUser));

export default authRoutes;
