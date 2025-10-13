import mongoose, { Schema } from "mongoose";

type FoodSchemaType = {
    foodName: string,
    price: number,
    image: string,
    ingredients: string,
};

const FoodSchema = new Schema({
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
});

export const Food =
    mongoose.models.Category ||
    mongoose.model<FoodSchemaType>("Food", FoodSchema);