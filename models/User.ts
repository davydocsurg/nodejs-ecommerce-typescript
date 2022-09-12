import mongoose from "mongoose";
import validator from "validator";

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
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const User = mongoose.model("User", userSchema);

export default User;
