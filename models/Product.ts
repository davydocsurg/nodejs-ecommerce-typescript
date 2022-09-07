import { getDb } from "../utils/db";
import { ProductDetails } from "../types/product";
import { Response } from "express";
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [
                5,
                "Title is shorter than the minimum allowed length (5)",
            ],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        imageUrl: {
            type: String,
            required: [true, "Image URL is required"],
        },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Product = mongoose.model("Product", PropertySchema);

export default Product;

// export class Product {
//     title?: string;
//     imageUrl?: string;
//     description?: string;
//     price?: number;

//     constructor(
//         title?: string,
//         description?: string,
//         price?: number,
//         imageUrl?: string
//     ) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.imageUrl = imageUrl;
//     }

//     save() {
//         const db = getDb();
//         return db
//             .collection("products")
//             .insertOne(this)
//             .then((res: Response) => {
//                 console.log(res);
//             })
//             .catch((err: Error) => {
//                 console.error(err);
//             });
//     }
// }
