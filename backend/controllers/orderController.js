
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { frontendUrl } from "../config/url.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {

    const { userId, address, items, amount } = req.body;
    if (!userId || !address || !items || !amount) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: userId, address, items, and amount are required."
        });
    }

    try {
        const newOrder = new orderModel({
            userId,
            address,
            items,
            amount,
        });

        await newOrder.save();

        // Loop through the items and remove each one from the cart
        for (let item of items) {
            await userModel.findByIdAndUpdate(
                userId,
                { $pull: { cartData: { _id: item._id } } }  // Remove item based on its _id
            );
        }


        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery charges",
                },
                unit_amount: 2 * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log("error in backend(stripe payment)", error);
        res.json({ success: false, message: "error in backend(stripe payment)" });
    }
}

const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log("Error in verifying order ", error)
        res.json({ success: false, message: "Error in verifying order" });
    }
}

//user orders for frontend
const userOrders = async (req, res) => {
    const { userId } = req.body;
    try {
        const ordersData = await orderModel.find({ userId: userId });
        res.json({ success: true, data: ordersData });
    } catch (error) {
        console.log("error in fetching user orders", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}

//Listing orders for admin planel
const orders = async (req, res) => {
    const { ownerId } = req.params;
    try {
        const orders = await orderModel.find({
            //$elemMatch: This operator is used to match documents that contain an array field (in this case, items) where at least one element matches the given condition.
            items: { $elemMatch: { owner: ownerId } }
        });
        res.json({success: true, data: orders});
    } catch (error) {
        console.log("error in users orders", error);
        res.json({success: false, message: "Error in listing orders"});
    }
}

const updateStatus = async (req, res) =>{
    const { orderId, status } = req.body;
    try {
        await orderModel.findByIdAndUpdate(orderId, {status: status});
        res.json({success: true, message:"Status updated"});
    } catch (error) {
        console.log("error in update status", error);
        res.json({success: false, message: "Error in updating status"});
    }
}

export { placeOrder, verifyOrder, userOrders, orders, updateStatus };