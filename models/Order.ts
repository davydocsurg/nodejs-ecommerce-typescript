import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            product: {
                type: Object,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],

    user: {
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
