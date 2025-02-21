
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../config/config";

export default function Update() {

    const user = useSelector((state) => state.user.user);
    const userId = user._id;
    const { id } = useParams();
    const [foods, setFoods] = useState([]);

    const getFoodList = async () => {
        try {
            const res = await axios.get(`${backendUrl}/food/list/${userId}`);
            setFoods(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getFoodList();
    }, []);

    const food = foods.find((item) => item._id === id);

    const [loading, setLoading] = useState(false); 


    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad",
        image: null, 
    });

    // Update state with food data once food object is available
    useEffect(() => {
        if (food) {
            setData({
                name: food.name,
                description: food.description,
                price: food.price,
                category: food.category,
                image: food.image,
            });
        }
    }, [food]); // Only re-run when food changes

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setData((prev) => {
            return { ...prev, [fieldName]: fieldValue };
        });
    };

    const handleFileChange = (e) => {
        setData((prev) => ({
            ...prev,
            image: e.target.files[0], // Store the file in state
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submission starts

        try {
            const res = await axios.put(`${backendUrl}/food/update/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                console.log(res.data.message);
            } else {
                toast.error(res.data.message);
                console.log(res.data.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false once the request completes
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>

                    <label htmlFor="image">
                        <img
                            src={data.image ? (typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)) : assets.upload_icon}
                            alt="Food Image"
                        />
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleFileChange} 
                        hidden
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={handleChange}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        onChange={handleChange}
                        value={data.description}
                        name="description"
                        rows={6}
                        placeholder="write description here"
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select name="category" onChange={handleChange} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Cake">Cake</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={handleChange}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$20"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn" disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
}
