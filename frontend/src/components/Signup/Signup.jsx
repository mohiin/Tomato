
import { useState } from "react";
import "../Login/Login.css";
import { useDispatch } from "react-redux";
import { openLoginForm, openSignupForm } from "../../redux/formSlice";
import { signupUser } from "../../redux/userSlice";
import { toast } from "react-toastify";

export default function Signup() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false); // Track loading state


    const handleShowSignupForm = () => {
        dispatch(openSignupForm());
    };

    const handleShowLoginForm = () => {
        dispatch(openLoginForm());
    }

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


    const userData = formData;

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signupUser(userData))
            .then((result) => {
                setLoading(false);
                if (result.type === "user/signupUser/fulfilled") {
                    if (result.payload.success) {
                        toast.success(result.payload.message);
                        dispatch(openSignupForm());
                    } else {
                        toast.error(result.payload.message);
                    }
                } else {
                    console.log("Signup failed:", result.error.message);  // Handle error
                    toast.error(result.error.message || "Signup failed!");
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log("Signup failed:", error.message);
                toast.error(error.message || "Signup failed!");
            });
    }


    return (
        <div className="login">
            <form onSubmit={handleSignup} className="login-form">
                <div className="form-title">
                    <h2>Sign up</h2>
                    <p onClick={handleShowSignupForm}><i className="fa-solid fa-xmark"></i></p>
                </div>
                <div className="form-input">
                    <input type="text" name="username" value={formData.username} onChange={handleFormData} placeholder="name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleFormData} placeholder="email" required />
                    <div className="form-input-password">
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleFormData} placeholder="password" required />
                        {
                            showPassword ? <i onClick={handleShowPassword} className="fa-regular fa-eye"></i> : <i onClick={handleShowPassword} className="fa-regular fa-eye-slash"></i>
                        }
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Signup"}
                </button>
                <div className="form-condition">
                    <input type="checkbox" name="" required />
                    <p>I agree to Tomato's Terms of Service & Privacy Policy</p>
                </div>
                <div className="switch-form">
                    <p>Already have an account? <span onClick={handleShowLoginForm}>Login</span></p>
                </div>
            </form>
        </div>
    )
}