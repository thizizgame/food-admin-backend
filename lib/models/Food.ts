import mongoose, { Schema } from "mongoose";

type FoodSchemaType = {
    foodName: string,
    price: number,
    image: string,
    ingredients: string,
    category: string,
};

const FoodSchema = new Schema({
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: String,
});

export const Food =
    mongoose.models.Food ||
    mongoose.model<FoodSchemaType>("Food", FoodSchema);