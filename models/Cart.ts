import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import validator from "validator";
import Product from "./Product";

// interface existingProds{};
interface updatedProds {
    qty?: string;
}

export interface CartType {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

export const addProdToCart = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then((prod) => {
            console.log(prod);

            return req.user.addToCart(prod);
        })
        .catch((err) => {
            console.error(err);
        });
};

// const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({

// })
