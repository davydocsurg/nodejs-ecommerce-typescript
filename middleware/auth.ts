import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/helper";

export const isAuthenticated = catchAsync(
    async (res: Response, req: Request, next: NextFunction) => {
        if (!req.session.isLoggedIn) {
            return res.redirect("/login");
        }
        next();
    }
);
