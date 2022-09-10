import { Request, Response, NextFunction } from "express";
import { Model, Models } from "mongoose";
import { AppError } from "../helpers/appError";
import { catchAsync } from "../helpers/helper";

export const getOne = async (
    Model: Model<Models>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const docID = req.params.id;
    // console.log(docID, "id");

    const doc = await Model.findById(docID);

    if (!doc) {
        return next(new AppError("No document with that ID was found", 404));
    }
    console.log(doc);

    return doc;
};
