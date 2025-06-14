
import { v2 as cloudinary } from "cloudinary";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";


//add food item - create
const addFood = async (req, res) => {

    // Validate if the file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Validate required fields in req.body
    const { name, description, price, category, owner } = req.body;
    if (!name || !description || !price || !category || !owner) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: name, description, price, category, and owner are required."
        });
    }

    // Validate price (ensure it's a number and positive)
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ success: false, message: "Price must be a valid positive number" });
    }

    // Image URL
    let img_url = req.file.path;
    try {
        const food = new foodModel({
            name,
            description,
            price,
            category,
            owner,
            image: img_url,
        });


        await food.save();
        res.status(200).json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.log(`food not added, message: ${error?.message}`);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the food item",
            error: error.message,
        });
    }
}


//get all the foods for display in frontend
const getAllFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching food items for frontend",
            error: error.message,
        });
    }
}

//get all the food items - for a specific admin
const foodList = async (req, res) => {
    const { userId } = req.params;

    try {
        const userData = await userModel.findById(userId); 
        if(!userData){
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const foods = await foodModel.find({ owner: userId });
        if (!foods || foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No food items found for this Admin.",
            });
        }
        res.status(200).json({ success: true, data: foods })
    } catch (error) {
        console.log(`Error in fetching foods, message: ${error?.message}`);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching food items",
            error: error.message,
        });
    }
}

//remove a food item - delete
const removeFood = async (req, res) => {

    try {
        let { id } = req.params;
        const foodItem = await foodModel.findById(id);
        // Delete the image if exists
        if (foodItem.image) {
            await deleteImageFromCloudinary(foodItem.image);
        }
        const foods = await foodModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: foods, message: "Food item deleted!" });
    } catch (error) {
        console.log(`food not removed, message: ${error?.message}`);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the food item",
            error: error.message,
        });
    }
}

const deleteImageFromCloudinary = async (imageUrl) => {

    // Extract the public ID from the image URL
    const publicId = imageUrl.split('/').slice(-2, -1).concat(imageUrl.split('/').pop().split('.')[0]).join('/');

    try {
        await cloudinary.uploader.destroy(publicId);  // This deletes the image from Cloudinary
    } catch (error) {
        throw new Error('Error deleting image from Cloudinary');

    }
};

// //update a food item - update
const updateFood = async (req, res) => {
    const { name, description, price, image, category } = req.body;
    const { id } = req.params;
    const foodItem = await foodModel.findById(id);

    // Prepare an object to store the updated fields
    let updatedFields = {};

    // Only update fields that are different
    if (name && name !== foodItem.name) updatedFields.name = name;
    if (description && description !== foodItem.description) updatedFields.description = description;
    if (price && price !== foodItem.price) updatedFields.price = price;
    if (category && category !== foodItem.category) updatedFields.category = category;

    // Check if the image path has changed
    if (req.file) {
        if (foodItem.image && foodItem.image !== req.file.path) {
            // Delete the old image if it exists and the new image is different
            console.log("image is deleted!");
            await deleteImageFromCloudinary(foodItem.image);
        }
        updatedFields.image = req.file.path; // Only update the image field if a new image is provided
    }

    try {
        // Update only the fields that were changed
        await foodModel.findByIdAndUpdate(id, updatedFields);
        res.status(200).json({ success: true, message: "Food item updated!" });
    } catch (error) {
        console.log(`Food not updated, message: ${error?.message}`);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the food item",
            error: error.message,
        });
    }
};


//search for food
const searchFood = async (req, res) => {
    const { foodname } = req.params;
    try {
        const searchQuery = {
            "$or": [
                { name: { $regex: foodname, $options: 'i' } },
                { category: { $regex: foodname, $options: 'i' } },
            ]
        };

        const foodList = await foodModel.find(searchQuery);

        res.json({ success: true, data: foodList, message: "items fetched!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error in food search" });
    }

}

export { addFood, getAllFood, foodList, removeFood, updateFood, searchFood };