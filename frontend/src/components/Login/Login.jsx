
import { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { openSignupForm, openLoginForm } from "../../redux/formSlice";
import { loginUser } from "../../redux/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLoading from "../../Hooks/useLoading.jsx";

// import { closeForm } from "../../redux/formSlice";

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, setLoading} = useLoading();

    const handleShowLoginForm = () => {
        // dispatch(toggleShowLoginForm());
        dispatch(openLoginForm());


    }
    const handleShowSignupForm = () => {
        dispatch(openSignupForm());
    };


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",

    });

    const handleFormData = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setFormData((prev) => {
            return { ...prev, [fieldName]: fieldValue }
        });
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const credentials = { email: formData.email, password: formData.password }; // Example credentials
        dispatch(loginUser(credentials))
            .then((result) => {
                setLoading(false);
                if (result.type === "user/loginUser/fulfilled") {
                    //console.log('Account created:', result.payload);  // Success message
                    if (result.payload.success) {
                        toast.success(result.payload.message);
                        dispatch(openLoginForm());
                        // Check if there's a redirect path stored in localStorage
                        const redirectPath = localStorage.getItem('redirectTo');

                        if (redirectPath) {
                            // Navigate to the stored path
                            navigate(redirectPath);
                            localStorage.removeItem('redirectTo'); // Clear the redirect path
                        }
                    } else {
                        toast.error(result.payload.message);
                    }
                } else {
                    console.log("Login failed:", result.error.message);
                    toast.error(result.error.message || "Login failed!");
                }
            })
            .catch((error) => {
                // In case something goes wrong outside of the dispatch (e.g., network error)
                setLoading(false);
                console.log("Login failed:", error.message);
                toast.error(error.message || "Signup failed!");
            });
    }

    return (
        <div className="login">
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-title">
                    <h2>Login</h2>
                    <p onClick={handleShowLoginForm}><i className="fa-solid fa-xmark"></i></p>
                </div>
                <div className="form-input">
                    <input type="email" name="email" value={formData.email} onChange={handleFormData} placeholder="email" required />
                    <div className="form-input-password">
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleFormData} placeholder="password" required />
                        {
                            showPassword ? <i onClick={handleShowPassword} className="fa-regular fa-eye"></i> : <i onClick={handleShowPassword} className="fa-regular fa-eye-slash"></i>
                        }
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
                <div className="switch-form">
                    <p>New to Tomato? <span onClick={handleShowSignupForm}>Create account</span></p>
                </div>
            </form>
        </div>
    )
}