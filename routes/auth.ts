import express from "express";
import AuthController from "../controllers/AuthController";
import { catchAsync } from "../helpers";
import { check } from "express-validator";

const authRoutes = express.Router();

// get routes
authRoutes.route("/login").get(catchAsync(AuthController.getLoginPage));
authRoutes.route("/signup").get(catchAsync(AuthController.getSignupPage));
authRoutes.route("/reset-pwd").get(catchAsync(AuthController.getPwdResetPage));
authRoutes.route("/reset/:token").get(catchAsync(AuthController.getNewPwdPage));

// post routes
authRoutes
    .route("/login")
    .post(
        [check("email").isEmail().normalizeEmail()],
        catchAsync(AuthController.loginUser)
    );
authRoutes.route("/signup").post(
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),
        check("password", "Password must be greater than 8 characters")
            .isLength({ min: 8, max: 15 })
            .trim(),
        check("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords have to match!");
                }
                return true;
            })
            .trim(),
    ],
    catchAsync(AuthController.registerUser)
);
authRoutes.route("/logout").post(catchAsync(AuthController.logout));
authRoutes.route("/reset-pwd").post(catchAsync(AuthController.resetPwd));
authRoutes.route("/new-password").post(catchAsync(AuthController.createNewPwd));

export default authRoutes;
