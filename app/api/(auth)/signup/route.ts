import { User } from "@/lib/models/User";
import connectDB from "@/lib/mongodb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
    await connectDB();
    const body = await request.json();
    const { password, email } = body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
        email: email,
        password: hashPassword,
        role: "USER",
    });
    return NextResponse.json({ message: "Successfully created user", user })
}