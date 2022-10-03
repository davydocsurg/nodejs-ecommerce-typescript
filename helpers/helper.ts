import { Request, Response, NextFunction } from "express";
import User from "../models/User";

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

export const findUserById = async (req: Request, next: NextFunction) => {
    if (!req?.session) {
        return false;
    }
    // console.log(req.session.user);

    const user = await User.findById(req.session.user._id);
    req.user = user;
    console.log(req.user);

    // User.findById(req.session.user._id)
    //     .then((user) => {
    //         req.user = user;
    //         console.log(req.user);
    //         next();
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
};
