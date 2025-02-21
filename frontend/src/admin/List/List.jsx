
import axios from "axios";
import { useSelector } from "react-redux";
import "./List.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../../config/config";

export default function List() {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    const userId = user._id;

    const [loadingItems, setLoadingItems] = useState({}); // Track loading state for each food item

    const [foods, setFoods] = useState([]);

    const getFoodList = async () => {
        try {
            const res = await axios.get(`${backendUrl}/food/list/${userId}`);
            setFoods(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const removeFood = async (id) => {
        // Set loading state for the specific item being deleted
        setLoadingItems((prev) => ({ ...prev, [id]: true }));
        try {
            const res = await axios.delete(`${backendUrl}/food/remove/${id}`);
            const foodId = res.data.data._id
            const updateFoods = foods.filter((item) => item._id !== foodId);
            setFoods(updateFoods);
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.success(error.message);
        } finally {
             // Reset the loading state for the deleted item
             setLoadingItems((prev) => ({ ...prev, [id]: false }));
        }

    }

    useEffect(() => {
        getFoodList();
    }, [])


    return (
        <>
            <div className="list add flex-col">
                <h2>All food list</h2>
                <div className="list-table-format title">
                    <b>image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Update</b>
                    <b>Delete</b>
                </div>

                {
                    foods.length === 0 ? (
                        <>
                            <p>You haven't add any food yet!</p>
                        </>
                    ) : (
                        foods.map((food, index) => {
                            return (<div key={index} className="list-table-format">
                                <img src={food.image} alt="" />
                                <p>{food.name.slice(0, 15)}...</p>
                                <p>{food.category}</p>
                                <p>{food.price}</p>
                                <button onClick={() => navigate(`/update/${food._id}`)}>Update</button>
                                <p
                                    className="cross"
                                    onClick={() => removeFood(food._id)}
                                    disabled={loadingItems[food._id]} // Disable the "X" button if the item is deleting
                                >
                                    {loadingItems[food._id] ? "Deleting..." : "X"}
                                </p>

                            </div>
                            )
                        })
                    )
                }
            </div>
        </>
    )
}