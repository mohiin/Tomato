
import passport from "passport";
import userModel from "../models/userModel.js";

//register or signup an user
const signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        // Check if the email or username already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, user: null, message: "Email or username already exists" });
        }

        // Check password strength (example validation)
        if (password.length < 6) {
            return res.status(400).json({ success: false, user: null, message: "Password must be at least 6 characters long" });
        }

        // Create a new user object
        const newUser = userModel({
            username,
            email,
        });

        await userModel.register(newUser, password);
        req.session.user = { _id: newUser._id, username: newUser.username, cartData: newUser.cartData }; // Store user data in session
        // Redirect or send success response
        res.status(200).json({
            success: true, user: {
                username: newUser.username,
                email: newUser.email,
                _id: newUser._id  // Send the user ID and any other relevant fields
            }, message: "User registered successfully!"
        });

    } catch (error) {
        console.error(error?.message);
        res.status(500).json({ success: false, user: null, message: "Error in registering user" });
    }
}

//login user
const login = async (req, res) => {

    const { email } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return res.json({ success: false, user: null, message: "User not found!" });
    }

    try {

        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.log("Error during authentication: ", err);
                return res.status(400).json({ success: false, user: null, message: "Error during authentication" });
            }

            if (!user) {
                console.log("Authentication failed: ", info);
                return res.status(401).json({ success: false, user: null, message: "Invalid credentials" });
            }

            //login the user if authentication was successful
            req.login(user, (loginErr) => {
                if (loginErr) {
                    console.error("Error during login: ", loginErr);
                    return res.status(400).json({ message: "Error logging in the user" });
                }
                req.session.user = { _id: user._id, username: user.username, cartData: user.cartData };
                return res.json({ success: true, user: req.session.user, message: "You are logged in now!" });
            })

        })(req, res); // Pass request and response to Passport's authentication function / call the authenticate function
    } catch (error) {
        console.error("General error during login: ", error);
        res.status(500).json({ message: "Error loggin in the user" });
    }
}

const checkUser = (req, res) => {
    if (req.session && req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.json({ success: false, message: 'No session found' });
    }
};


//logout the user
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.json({ success: true, message: "User logged out successfully." });
    })
}

export { signup, login, logout, checkUser };
