
import { useEffect, useState } from "react"
import "./Orders.css"
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js"
import { backendUrl } from "../../config/config.js";
import { useSelector } from "react-redux";

export default function Orders() {

    const user = useSelector((state) => state.user.user);
    const ownerId = user._id;
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const res = await axios.get(`${backendUrl}/order/list/${ownerId}`);
        if (res.data.success) {
            setOrders(res.data.data);
        } else {
            toast.error("Error");
        }
    }

    const changeStatus = async (e, orderId) => {
        const res = await axios.post(`${backendUrl}/order/status`, {
            orderId,
            status: e.target.value,
        });
        if (res.data.success) {
            await fetchAllOrders();
        }
    }
    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="order add flex-col">
            <div className="order-list">
                {
                    orders.length === 0 ? (
                        <>
                            <h4> No Orders Placed</h4>
                            <p>Currently, there are no orders in the system. Please check back later.</p>
                        </>
                    ) : (
                        orders.map((order, index) => (
                            <div key={index} className="order-item">
                                <img src={assets.parcel_icon} alt="" />
                                <div>
                                    <p className="order-item-food">
                                        {order.items.map((item, index) => {
                                            return item.name + " x " + item.quantity + ",";
                                        })}
                                    </p>
                                    <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                                    <div className="order-item-address">
                                        <p>{order.address.street + ","}</p>
                                        <p>{order.address.city + ", " + order.address.state + ", " + order.address.country}</p>
                                    </div>
                                    <p className="order-item-phone">{order.address.phone}</p>
                                </div>
                                <p>Items: {order.items.length}</p>
                                <p>${order.amount}</p>
                                <select onChange={(e) => changeStatus(e, order._id)} value={order.status} name="" id="">
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}