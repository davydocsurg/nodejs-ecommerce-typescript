import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/helper";

const isAuthenticated = catchAsync(
    async (res: Response, req: Request, next: NextFunction) => {
        const logInSession: boolean = await req.session.isLoggedIn;
        if (!logInSession) {
            return res.redirect("/login");
        }
        return next();
    }
);
export default isAuthenticated;
