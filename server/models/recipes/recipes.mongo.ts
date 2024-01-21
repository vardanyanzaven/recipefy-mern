import mongoose from "mongoose";

const recipesSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  sourceUrl: {
    type: String,
    required: true,
  },
  imageUrl: { type: String, required: true },
  ingredients: {
    type: [Object],
    required: true,
  },
  instructions: {
    type: [{ number: Number, step: String }],
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  readyInMinutes: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  diets: {
    type: [String],
    required: true,
  }
});

export default mongoose.model("Recipe", recipesSchema);
