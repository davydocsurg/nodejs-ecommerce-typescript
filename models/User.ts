import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "First Name must be provided"],
            minlength: 3,
        },
        username: {
            type: String,
            trim: true,
            required: [true, "Username must be provided"],
            minlength: 3,
        },
        email: {
            type: String,
            required: [true, "Email Name must be provided"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide a valid email."],
        },
        cart: {
            items: [
                {
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

userSchema.methods.addToCart = function (product: any) {
    const cartProductIndex = this.cart.items.findIndex((cp: any) => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = (productId: any) => {
    const updatedCart = this.cart.items.filter((item: any) => {
        return item.productId.toString();
    });

    this.cart.items = updatedCart;
    return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
