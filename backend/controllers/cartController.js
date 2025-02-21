import userModel from "../models/userModel.js";

//add to cart - create
const addToCart = async (req, res) => {

    const { userId } = req.body;

    try {
        if(!userId){
            return res.status(400).json({success: false, message: "User ID is required!"})
        }
        const userData = await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const cartData = await userData.cartData;
        const item = req.body.item;

        const existingItem = cartData.find(cartItem => cartItem._id === item._id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartData.push({ ...item, quantity: 1 });
        }
        
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Item added!", cartData: cartData });
    } catch (error) {
        console.log("Error during item adding to cart ", error);
        res.status(500).json({ success: false, message: "Item not added!" });
    }
}


//get all cart items - read
const getCartData = async (req, res) => {
    const { userId } = req.params;
    try {
        const userData = await userModel.findById(userId); 
        if(!userData){
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const foods = userData.cartData;
        res.status(200).json({ success: true, data: foods });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error during fetching cart data!" });
    }
}

//remove an item from cart - delete
const removeFromCart = async(req, res)=>{
    const { userId, itemId } = req.body;
    try {
        // Find the user
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Check if the cart is empty
        if (userData.cartData.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty!" });
        }

        // Filter out the item from the cart
        const updatedCart = userData.cartData.filter(item => item._id.toString() !== itemId);

        // If the item is not found in the cart, return an appropriate message
        if (updatedCart.length === userData.cartData.length) {
            return res.status(400).json({ success: false, message: "Item not found in the cart!" });
        }

        // Update the user's cartData
        userData.cartData = updatedCart;
        await userData.save();

        // Send response with updated cart
        res.status(200).json({ success: true, message: "Item removed!", cartData: updatedCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error during removing item"});
    }
}

//update and item - update/put/patch

export { addToCart, getCartData, removeFromCart };