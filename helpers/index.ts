import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
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

export const ProductsPagination = (page: number, ITEMS_PER_PAGE: number) => {
    return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
};

export const AdminProductsPagination = (
    page: number,
    ITEMS_PER_PAGE: number,
    req: Request
) => {
    return Product.find({
        userId: req.session.user?._id,
    })
        .populate("userId")

        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
};

export const findUserById = async (req: Request, next: NextFunction) => {
    if (!req?.session) {
        return false;
    }
    // console.log(req.session.user);

    const user = await User.findById(req.session.user?._id.toString());
    req.user = user;
    next();
};

export const csrfSetup = (req: Request, res: Response, next: Function) => {
    res.locals.isAuthenticated = authCheck(req);
    res.locals.csrfToken = req.csrfToken();
    next();
};

export const checkForNextPage = (
    ITEMS_PER_PAGE: number,
    page: number,
    totalItems: number
) => {
    return ITEMS_PER_PAGE * page < totalItems;
};

export const calcPrevPage = (page: number) => {
    return page > 1;
};

export const getNextPage = (page: number) => {
    return page + 1;
};

export const getPrevPage = (page: number) => {
    return page - 1;
};

export const getLastPage = (totalItems: number, ITEMS_PER_PAGE: number) => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
};

export const getUserProducts = async (req: Request) => {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items;
    return products;
};
