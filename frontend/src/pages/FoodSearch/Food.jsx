import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoods } from "../../redux/foodSlice";
import FoodItem from "../../components/FoodItem/FoodItem";
import Spinner from "../../components/Spinner/Spinner";

export default function Food() {

    const dispatch = useDispatch();

    // Fetch all foods when the component mounts
    useEffect(() => {
        dispatch(fetchAllFoods());
    }, [dispatch]);

    // Get foodList from the Redux store
    const foodList = useSelector((state) => state.food.foodList);
    const isLoading = useSelector((state) => state.food.isLoading);

    return (
        <div className="food-display">
            <p>Searching for foods...</p>
            {
                isLoading && <Spinner />
            }
            <div className="food-display-list">
                {
                    foodList && foodList.length === 0 ? (
                        !isLoading && <h2>No food items found!</h2>  // Show this message when no foods are available
                    ) : (
                        foodList && foodList.map((item, index) => {
                            return <FoodItem item={item} key={index} />;
                        })
                    )
                }

            </div>

        </div>
    )
}