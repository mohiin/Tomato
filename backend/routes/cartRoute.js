import express from "express";
import { addToCart, getCartData, removeFromCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", getCartData);
cartRouter.post("/remove", removeFromCart);

export default cartRouter;

