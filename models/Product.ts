import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [
                5,
                "Title is shorter than the minimum allowed length (5)",
            ],
        },
        slug: {
            type: String,
            trim: true,
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
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ProductSchema.pre("save", async function (next: Function) {
    this.slug = slugify(this.title + new Date(), { lower: true });
    next();
});

const Product = mongoose.model("Product", ProductSchema);

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
