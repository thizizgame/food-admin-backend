import { createFood, getAllFoods } from "@/lib/services/food-service";
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
        const foodName = form.get("name") as string;
        const price = Number(form.get("price"));
        const ingredients = form.get("ingredients") as string;
        const category = form.get("category") as string;
        const image = form.get("image") as File | null; // image нь File объект байна

        // ✅ validation
        if (!foodName || !price || !ingredients || !category || !image) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // ⚙️ DB руу хадгалах (энд image URL эсвэл buffer дамжуулж болно)
        await createFood({
            foodName,
            price,
            ingredients,
            category,
            image
        });

        return NextResponse.json({ message: "Food created successfully!" }, { status: 201 });
    } catch (error) {
        console.error("POST /api/food error:", error);
        return NextResponse.json({ error: "Failed to create food" }, { status: 500 });
    }
}
