import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    diets: {
        type: [String],
        required: true,
    }
});

export default mongoose.model("User", userSchema);