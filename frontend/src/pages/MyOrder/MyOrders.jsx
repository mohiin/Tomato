
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./MyOrders.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config/config";


export default function MyOrder() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [orderData, setOrderData] = useState([]);
    const userId = user && user._id;

    const fetchOrderData = async () => {
        const res = await axios.post(`${backendUrl}/order/userorders`, { userId });
        setOrderData(res.data.data);
    
    }

    useEffect(() => {
        if (user) {
            fetchOrderData();
        }
    }, [user]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {
                    orderData.length === 0 ? (
                        <>
                            <p className="no-orders-message">You haven't placed any orders yet. Browse our food list to place an order!</p>
                            <button onClick={() => navigate("/")} className="browse-button">View Foods</button>
                        </>
                    ) : (
                        orderData.map((order, index) => {
                            return (
                                <div key={index} className="my-orders-order">
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>
                                        {order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return `${item.name} X ${item.quantity}`;
                                            } else {
                                                return `${item.name} X ${item.quantity},`;
                                            }
                                        })}
                                    </p>
                                    <p>${order.amount}</p>
                                    <p>items: {order.items.length}</p>
                                    <p> <span>&#x25cf;</span> <b>{order.status}</b> </p>
                                    <button>Track Order</button>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}
