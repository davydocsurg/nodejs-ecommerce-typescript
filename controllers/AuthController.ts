import { Request, NextFunction, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

class AuthController {
    constructor() {
        this.getLoginPage = this.getLoginPage.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    getLoginPage(req: Request, res: Response, next: NextFunction) {
        // const isLoggedIn = req
        //     .get("Cookie")
        //     ?.split(";")[1]
        //     .split("=")[1]
        //     .trim();
        // console.log(req.session.isLoggedIn, "check");
        res.render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            isAuthenticated: false,
        });
    }

    getSignupPage(req: Request, res: Response, next: NextFunction) {
        res.render("auth/signup", {
            path: "/signup",
            pageTitle: "Signup",
            isAuthenticated: false,
        });
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.redirect("/login");
        }

        try {
            bcrypt.compare(password, user.password);
            // req.session.isLoggedIn = true;
            // req.session.user = user;
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

        return res.redirect("/login");
    }
}

export default new AuthController();
