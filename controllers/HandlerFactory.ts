import { Request, Response, NextFunction } from "express";
import mongoose, { Model, Models } from "mongoose";
import { AppError } from "../helpers/appError";

export const getOne = async (
    Model: Model<Models>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const docID = req.params.id.trim();
    // console.log(typeof docID, "id");

    const doc = await Model.findById(docID);

    if (!doc) {
        return next(new AppError("No document with that ID was found", 404));
    }

    return doc;
};

export const deleteOne = async (
    Model: Model<Models>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const docID = req.body.productId.trim();
    // const doc = await Model.findById(docID);
    const doc = await Model.findByIdAndDelete(docID);

    if (!doc) {
        return next(new AppError("No document with that ID was found", 404));
    }
    return doc;
};
