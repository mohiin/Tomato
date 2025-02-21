
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useState, } from "react";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";


export default function FoodItem({ item }) {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [imgClick, setImgClick] = useState(assets.add_icon_white);

    const handleImgClick = () => {
        setImgClick(assets.add_icon_green);
        // After 1 second, reset to the original image
        setTimeout(() => {
            setImgClick(assets.add_icon_white);
        }, 1000);
    }

    const handleAddToCart = (item) => {
        if (user) {
            dispatch(addToCart({ userId: user._id, item }));
            toast.success("Item added!");
        } else {
            toast.error("You are not logged in");
        }
    };

    return (
        <div key={item._id} className="food-item">
            <div className="food-item-img">
                <img src={item.image} alt="" />
                {/* <img src="/profile_bgg.jpg" alt="" /> */}
                <img onClick={() => { handleAddToCart(item), handleImgClick() }} className="add-icon" src={imgClick} alt="" />
            </div>
            <div className="food-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="item-price">${item.price}</p>
            </div>
        </div>
    )
}