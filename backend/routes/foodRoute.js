import express from "express";
import { addFood, foodList, getAllFood, removeFood, searchFood, updateFood } from "../controllers/foodController.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({storage});
// const upload = multer({dest: "upload/"});

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/all", getAllFood);
foodRouter.get("/list/:userId", foodList);
foodRouter.delete("/remove/:id", removeFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);
foodRouter.get("/search/:foodname", searchFood);


export default foodRouter;
