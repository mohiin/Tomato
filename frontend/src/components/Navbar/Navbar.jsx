
import "./Navbar.css"
import { assets } from "../../assets/assets.js"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSignupForm, openLoginForm } from "../../redux/formSlice.js";
import Login from "../Login/Login.jsx";
import Signup from "../Signup/Signup.jsx";
import { logoutUser } from "../../redux/userSlice.js";
import { clearCart, getCartData, } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { searchFood } from "../../redux/foodSlice.js";


export default function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const isOpenLogin = useSelector((state) => state.showForm.isOpenLogin);
    const isOpenSignup = useSelector((state) => state.showForm.isOpenSignup);

    const [click, setClick] = useState(false);

    const handleToggle = () => {
        setClick((prev) => !prev);
    };

    // Handler to toggle the Login form visibility
    const handleLoginClick = () => {
        dispatch(openLoginForm());
    };

    // Handler to toggle the Signup form visibility
    const handleSignupClick = () => {
        dispatch(openSignupForm());
    };

    const { user } = useSelector((state) => state.user);

    // Fetch cart data whenever user is available
    useEffect(() => {
        if (user) {
            dispatch(getCartData(user));  // Fetch cart data when user logs in
        }
    }, [user]);

    const handleLogout = () => {
        dispatch(logoutUser()); // Dispatch logout action
        dispatch(clearCart());
        toast.success("You are logged out now!");
        navigate("/");
    };

    // Handle focus event
    const handleFocus = () => {
        navigate("/food"); // Redirect to the foods page
    };

    // Handle blur event
    const handleBlur = () => {
        if (!searchValue) {
            navigate(-1); // Redirect back to the initial page
        }
    };

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        // dispatch(searchFood(searchValue));

        try {
            // Dispatch the async action and wait for it to complete
            await dispatch(searchFood(searchValue));
        } catch (error) {
            // Handle the error properly if the action was rejected
            console.error("Search failed:", error);
            alert(error.message || "An error occurred during the search."); // Show the actual error message
        }
    }

    useEffect(() => {
        return () => {
            setSearchValue(""); // Reset searchValue when the component unmounts
        };
    }, [navigate]);

    return (
        <>
            {isOpenLogin && <Login />}
            {isOpenSignup && <Signup />}

            <div className="navbar">

                <div className="brand">
                    <p onClick={() => navigate("/")}>Tomato</p>
                </div>

                <form onSubmit={handleSearch} onFocus={handleFocus}
                    onBlur={handleBlur} className="nav-search" action="">
                    <p><i className="fa-solid fa-magnifying-glass"></i></p>
                    <input name="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Search for food" required />
                </form>

                <div onClick={() => navigate("/cart")} className="bag">
                    <img src={assets.bag_icon} alt="" />
                    <div className={totalAmount && "dot"}></div>
                </div>

                <div className={click && !user ? "nav-button active" : "nav-button"} >
                    {
                        !user && <>
                            <button onClick={handleLoginClick} >Log in</button>
                            <button className="btn" onClick={handleSignupClick} >Sign up</button>
                        </>
                    }
                </div>

                {
                    user ? <>
                        <div className="nav-profile">
                            <img onClick={() => navigate("/dashboard")} src={assets.profile_icon} alt="" />
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate("/myorders")}><p>Orders</p></li>
                                <hr />
                                <li onClick={() => navigate("/dashboard")}><p>Dashbord</p></li>
                                <hr />
                                <li onClick={handleLogout}><p>Logout</p></li>
                            </ul>
                        </div>
                    </> :

                        <div className="nav-toggle">
                            {
                                !click ? <p className="bars" onClick={handleToggle} ><i className="fa-solid fa-bars"></i> </p>
                                    : <p className="cross" onClick={handleToggle}><i className="fa-solid fa-xmark"></i></p>
                            }
                        </div>

                }
            </div>
        </>
    )
}