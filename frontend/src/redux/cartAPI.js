
import axios from "axios";
import { backendUrl } from "../config/config";

export const addToCartAPI = async (payload) => {
    const response = await axios.post(`${backendUrl}/cart/add`, payload, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.data;
};


export const removeFromCartAPI = async (payload) => {
    const response = await axios.post(`${backendUrl}/cart/remove`, payload, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
}

export const getCartDataAPI = async (user) => {
    const response = await axios.get(`${backendUrl}/cart/get/${user._id}`, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data.data || [];//if cart is empty 
}
