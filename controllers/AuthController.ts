import { Request, NextFunction, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { authCheck, goHome } from "../helpers/helper";
import Logging from "../helpers/logs";
import MailServices from "../services/mailServices";
import { smtpSender } from "../utils/constants";

class AuthController {
    constructor() {
        this.getLoginPage = this.getLoginPage.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.getSignupPage = this.getSignupPage.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.logout = this.logout.bind(this);
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
            subject: "Registration Succesful",
            html: `
            <h1>
                You've succesfully registered!
            </h1>
            `,
        };
        await MailServices.sendMail(registrationMail);
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
