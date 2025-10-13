import connectDB from "../mongodb";
import { Food } from "../models/Food";
type NewFoodInput = {
    foodName: string;
    price: number;
    ingredients: string;
    category: string;
    image: File | null;
};
export const createFood = async ({ foodName, price, ingredients, category, image }: NewFoodInput) => {
    await connectDB();
    const newFood = new Food({ foodName, price, ingredients, category, image });
    await newFood.save();
    return newFood;
};

export const getAllFoods = async () => {
    await connectDB();
    return await Food.find();
};