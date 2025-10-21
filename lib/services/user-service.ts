import { User } from "../models/User";
import connectDB from "../mongodb";
type NewUserInput = {
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    role: string;
};
export const createUser = async ({ email, password, address, phoneNumber, role }: NewUserInput) => {
    await connectDB();
    const newUser = new User({ email, password, address, phoneNumber, role });
    await newUser.save();
    return newUser;
};
