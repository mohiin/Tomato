
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllFoods } from "../../redux/foodSlice.js";
import Spinner from "../Spinner/Spinner.jsx";

export default function FoodDisplay({ category }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllFoods());
    }, [dispatch]);

    const foodList = useSelector((state) => state.food.foodList);
    const isLoading = useSelector((state) => state.food.isLoading);

    return (
        <div className="food-display">
            <h2>Top dishes near you</h2>
            {
                isLoading === true  && <Spinner />
            }
            <div className="food-display-list">
                {
                    foodList && foodList.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return <FoodItem item={item} key={index} />
                        }

                    })
                }
            </div>
        </div>
    )
}