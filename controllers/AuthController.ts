import { Request, NextFunction, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { authCheck, goHome } from "../helpers/helper";
import Logging from "../helpers/logs";
import MailServices, { transporter } from "../services/mailServices";
import { smtpSender } from "../utils/constants";
import crypto from "crypto";
import { validationResult } from "express-validator/check";

class AuthController {
    constructor() {
        this.getLoginPage = this.getLoginPage.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.getSignupPage = this.getSignupPage.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.logout = this.logout.bind(this);
        this.getPwdResetPage = this.getPwdResetPage.bind(this);
        // this.sendPwdResetEmail = this.sendPwdResetEmail.bind(this);
    }

    getLoginPage(req: Request, res: Response, next: NextFunction) {
        if (authCheck(req)) {
            return goHome(res);
        }
        // let message: any = req.flash("login-error");
        // if (message.length > 0) {
        //     message = message[0];
        // } else {
        //     message = null;
        // }

        res.render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            // errorMsg: message,
        });
    }

    getSignupPage(req: Request, res: Response) {
        if (authCheck(req)) {
            return goHome(res);
        }

        res.render("auth/signup", {
            path: "/signup",
            pageTitle: "Signup",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
        });
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        if (!user) {
            // req.flash("login-error", "Invalid credentials!");
            Logging.error("Invalid credentials!");
            return res.redirect("/login");
        }

        try {
            bcrypt.compare(password, user.password);
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
                console.error(err);

                res.redirect("/");
            });
        } catch (error) {
            console.error(error);

            return res.redirect("/login");
        }
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            Logging.error(errors.array()[0].msg);
            return res.status(422).render("auth/signup", {
                path: "/signup",
                pageTitle: "Signup",
                errorMessage: errors.array()[0].msg,
                isAuthenticated: authCheck(req),
                csrfToken: req.csrfToken(),
            });
        }

        if (password.trim() !== confirmPassword.trim()) {
            Logging.warn("Passwords must match!");
            const pwdError = "Passwords do not match!";
            return res.render("auth/signup", {
                path: "/signup",
            });
        }

        await User.findOne({ email: email }).then((userDoc) => {
            if (userDoc) {
                return res.redirect("/signup");
            }
        });
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
        });

        await user.save();
        const registrationMail = {
            to: email,
            from: smtpSender,
            subject: "Welcome to NodeTS",
            html: `
            <h1>
                You've succesfully registered!
            </h1>
            `,
        };
        res.redirect("/login");
        return await MailServices.sendMail(registrationMail);
    }

    async getPwdResetPage(req: Request, res: Response) {
        res.render("auth/reset-pwd", {
            path: "/reset-pwd",
            pageTitle: "Reset Password",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            // errorMsg: message,
        });
    }

    async resetPwd(req: Request, res: Response) {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                Logging.error(err);
                return res.redirect("/reset-pwd");
            }

            const token = buffer.toString("hex");
            User.findOne({ email: req.body.email })
                .then((user: any) => {
                    if (!user) {
                        Logging.warn("No account with this email was found");
                        return res.redirect("/reset-pwd");
                    }
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000;
                    user.save();
                })
                .then((result) => {
                    res.redirect("/");
                    // this.sendPwdResetEmail(req, token);
                    return transporter.sendMail({
                        to: req.body.email,
                        from: smtpSender,
                        subject: "Reset Password",
                        html: `
                        <p> You requested a password reset </p>
                        <p> Click this <a href="http://localhost:3001/reset/${token}"> link </a> to set a new password. </p>
                        `,
                    });
                })
                .catch((err) => {
                    Logging.error(err);
                });
        });
    }

    async getNewPwdPage(req: Request, res: Response) {
        const token = req.params.token;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        res.render("auth/new-password", {
            path: "/new-password",
            pageTitle: "New Password",
            csrfToken: req.csrfToken(),
            userId: user?._id.toString(),
            isAuthenticated: authCheck(req),
            passwordToken: token,
        });
    }

    async createNewPwd(req: Request, res: Response) {
        const newPwd = req.body.password;
        const userId = req.body.userId;
        const pwdToken = req.body.passwordToken;

        const user = await User.findOne({
            resetToken: pwdToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId,
        });

        const hashedPassword = await bcrypt.hash(newPwd, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        return res.redirect("/login");
    }

    logout(req: Request, res: Response, next: NextFunction) {
        req.session.destroy((err) => {
            console.error(err);

            return goHome(res);
        });
    }
}

export default new AuthController();
