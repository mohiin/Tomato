import express from "express";
import { orders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", userOrders);
orderRouter.get("/list/:ownerId", orders);
orderRouter.post("/status", updateStatus);

export default orderRouter;