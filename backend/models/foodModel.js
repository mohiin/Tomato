
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    image: {
        type: String,
        required: true,

        //     url: {
        //       type: String,
        //       required: true, 
        //     },
        //     filename: String,
    },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
