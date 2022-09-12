import User from "../models/User";
import { Request, NextFunction, Response } from "express";
import { getOne } from "./HandlerFactory";

class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this);
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        User.create({
            name: "Chibueze",
            username: "davydocsurg",
            email: "chibueze@gmail.com",
        });
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        return await getOne(User, req, res, next);
    }
}

export default new UserController();
