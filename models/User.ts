import mongoose from "mongoose";
import validator from "validator";
import { Item } from "../interfaces/cart";
import { ProductObj } from "../types/product";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "First Name must be provided"],
            minlength: 3,
        },

        email: {
            type: String,
            required: [true, "Email must be provided"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide a valid email."],
        },
        resetToken: {
            type: String,
            trim: true,
        },
        resetTokenExpiration: {
            type: Date,
            trim: true,
        },
        password: {
            type: String,
            trim: false,
            required: [true, "Password must be provided"],
            minlength: 8,
        },
        cart: {
            items: [
                {
                    product: {
                        type: Object,
                        required: true,
                    },
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.methods.addToCart = function (product: ProductObj) {
    // export const addToCart = function (product: ProductObj) {
    const cartProductIndex = this.cart.items.findIndex((cp: any) => {
        return cp.productId.toString() == product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            product: product,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (prodId: string) {
    const updatedCart = this.cart.items.filter((item: Item) => {
        return item._id.toString() !== prodId.toString();
    });

    this.cart.items = updatedCart;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
