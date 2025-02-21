
import { useState } from "react";
import { useSelector } from "react-redux"
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../config/config";
import "./PlaceOrder.css";


export default function PlaceOrder() {

    const user = useSelector((state) => state.user.user);
    const cartData = useSelector((state) => state.cart.cartData) || []; // Cart data from Redux
    const totalAmount = useSelector((state) => state.cart.totalAmount);
  
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const handleFormData = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setFormData((prev) => {
            return { ...prev, [fieldName]: fieldValue };
        })
    }

    const handleFormSubmit = async (e) => {//placeOrder
        e.preventDefault();
        let orderItems = [];
        cartData.map((item)=>{
            orderItems.push(item);
        });

       
        let orderData = {
            userId: user._id,
            address: formData,
            items: orderItems,
            amount: totalAmount + 2,
        }

        let res = await axios.post(`${backendUrl}/order/place`, orderData, {});
        if(res.data.success){
            const { session_url } = res.data;
            window.location.replace(session_url);
        }else{
            toast.error("payment error");
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className="place-order">
            <div className="place-order-left">
                <h2>Delivery Information</h2>
                <div className="multi-fields">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleFormData} placeholder="First name" required />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleFormData} placeholder="Last name" required />
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleFormData} placeholder="Email address" required />
                <input type="text" name="street" value={formData.street} onChange={handleFormData} placeholder="Street" required />
                <div className="multi-fields">
                    <input type="text" name="city" value={formData.city} onChange={handleFormData} placeholder="City" required />
                    <input type="text" name="state" value={formData.state} onChange={handleFormData} placeholder="State" required />
                </div>
                <div className="multi-fields">
                    <input type="number" name="zipcode" value={formData.zipcode} onChange={handleFormData} placeholder="Zip code" required />
                    <input type="text" name="country" value={formData.country} onChange={handleFormData} placeholder="Country" required />
                </div>
                <input type="number" name="phone" value={formData.phone} onChange={handleFormData} placeholder="Phone" required />

            </div>
            <div className="place-order-right">
                <h2>Cart Total</h2>
                <div className="cart-total-details">
                    <p>Subtoal</p>
                    <p>${totalAmount}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${totalAmount && 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Total</p>
                    <p>${totalAmount ? totalAmount + 2 : 0}</p>
                </div>
                <button disabled={totalAmount=== 0} type="submit">Proceed To Payment</button>
            </div>
        </form>
    )
}
