import express from "express";
import AuthController from "../controllers/AuthController";
import { catchAsync } from "../helpers/helper";

const authRoutes = express.Router();

authRoutes.route("/login").get(catchAsync(AuthController.getLoginPage));

export default authRoutes;
