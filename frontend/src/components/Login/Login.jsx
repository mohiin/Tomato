
import { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { openSignupForm, openLoginForm, closeForms } from "../../redux/formSlice";
import { loginUser } from "../../redux/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLoading from "../../Hooks/useLoading.jsx";


export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, setLoading } = useLoading();
    const isOpen = useSelector(state => state.showForm.isOpenLogin);

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
        try {
            setLoading(true);
            const credentials = { email: formData.email, password: formData.password };
            const result = await dispatch(loginUser(credentials));

            if (result.payload?.success) {
                toast.success(result.payload?.message);
                dispatch(closeForms());
                const redirectPath = localStorage.getItem('redirectTo');
                if (redirectPath) {
                    navigate(redirectPath);
                    localStorage.removeItem('redirectTo');
                }
            } else {
                console.log("Login failed:", result.payload?.message);
                toast.error(result.payload?.message || "Login failed!");
            }

        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }


    }

    return !isOpen ? null : (
        <div className="login">
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-title">
                    <h2>Login</h2>
                    <p onClick={() => dispatch(closeForms())}><i className="fa-solid fa-xmark"></i></p>
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