import mongoose from "mongoose";

const userAvatarSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true,
    }
});

export default mongoose.model("User_Avatar", userAvatarSchema);