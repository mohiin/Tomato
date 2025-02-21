
import { useSelector } from "react-redux";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Restaurant() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    return (
        <div className="dashboard">

            <div className="dashboard-admin">
                <h4 onClick={() => navigate("/add")}>Add New Food</h4>
                <h4 onClick={() => navigate("/list")}>View Food List</h4>
                <h4 onClick={() => navigate("/orders")}>Manage Orders</h4>
            </div>

            <div className="dashboard-user">
                <div className="profile-bg"></div>

                <div className="profile-info">
                    <div className="profile-img"></div>
                    <p>username: {user && user.username}</p>
                </div>
                <div className="order-section">
                    <h4>Your Orders</h4>
                    <button onClick={() => navigate("/myorders")}>View Orders</button>
                </div>
            </div>

        </div>
    )
}