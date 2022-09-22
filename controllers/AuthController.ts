import { Request, NextFunction, Response } from "express";

class AuthController {
    constructor() {
        this.getLoginPage = this.getLoginPage.bind(this);
    }

    async getLoginPage(req: Request, res: Response, next: NextFunction) {
        res.render("auth/login", {
            path: "/login",
            pageTitle: "Login",
        });
    }
}

export default new AuthController();
