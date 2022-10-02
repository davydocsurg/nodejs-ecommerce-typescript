import { Request, Response, NextFunction } from "express";

export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)?.catch(next);
    };
};

export const authCheck = (req: Request) => {
    if (req.session.isLoggedIn) {
        return true;
    } else {
        return false;
    }
};

export const goHome = (res: Response) => {
    res.redirect("/");
};
