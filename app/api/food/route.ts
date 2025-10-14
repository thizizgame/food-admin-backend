import { createFood, getAllFoods } from "@/lib/services/food-service";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const food = await getAllFoods();
    return new NextResponse(JSON.stringify({ data: food }), {
        status: 200,
    });
}
export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();

        // 🥗 FormData-с утгуудыг гаргаж авах
        const foodName = form.get("foodName") as string;
        const price = Number(form.get("price"));
        const ingredients = form.get("ingredients") as string;
        const category = form.get("category") as string;
        const image = form.get("image") as File | null; // image нь File объект байна
        console.log(foodName)
        // ✅ validation
        if (!foodName || !price || !ingredients || !category || !image) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const imageHandler = await uploadImageToCloudinary(image)
        // ⚙️ DB руу хадгалах 
        await createFood({
            foodName: foodName,
            price: price,
            ingredients: ingredients,
            category: category,
            image: imageHandler
        });

        return NextResponse.json({ message: "Food created successfully!" }, { status: 201 });
    } catch (error) {
        console.error("POST /api/food error:", error);
        return NextResponse.json({ error: "Failed to create food" }, { status: 500 });
    }
}
