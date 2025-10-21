import { User } from "@/lib/models/User";
import connectDB from "@/lib/mongodb"
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
    await connectDB();
    const body = await request.json();
    const { password, email } = body;
    const TryingLogin = await User.findOne({ email, password });
    console.log("TryingLogin", TryingLogin);
    if (TryingLogin !== null) {
        return NextResponse.json({ message: "Logged in" })
    } else {
        return NextResponse.json({ message: "Login Failed" })
    }
}