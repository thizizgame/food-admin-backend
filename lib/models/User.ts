import mongoose, { Schema } from "mongoose";

export type userType = {
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    role: string;
};
const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String },
        phoneNumber: { type: String },
        role: { type: String, required: true, enum: ["USER", "ADMIN"] }
    },
    {
        timestamps: true,
    }
);
export const User =
    mongoose.models.User ||
    mongoose.model<userType>("User", UserSchema);