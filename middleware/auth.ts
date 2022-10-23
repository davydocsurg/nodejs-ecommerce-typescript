import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers";

const isAuthenticated = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const logInSession: boolean = await req.session?.isLoggedIn;

        if (!logInSession) {
            return res.redirect("/login");
        }
        return next();
    }
);
export default isAuthenticated;
