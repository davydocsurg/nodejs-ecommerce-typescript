import { Request, NextFunction, Response } from "express";

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

    async loginUser(req: Request, res: Response, next: NextFunction) {
        req.session.isLoggedIn = true;
        res.redirect("/");
    }
}

export default new AuthController();
