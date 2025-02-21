import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, loginAPI, logoutAPI } from "./userAPI";


// Async action to sign up the user
export const signupUser = createAsyncThunk(
    "user/signupUser",

    async (userData) => {
        try {
            const data = await signupAPI(userData);
            return data;
        } catch (error) {
            return "Signup failed due to server error";
        }
    }
);


// Async action to log in the user
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials) => {
        try {
            const data = await loginAPI(credentials);
            return data;
        } catch (error) {
            return "Login failed due to server error";
        }
    }
);

// Async action to log out the user
export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async () => {
        try {
            const data = await logoutAPI();
            if (data.success) {
                return null; // Return null to clear the user state on successful logout
            }
        } catch (error) {
            return "Logout failed due to server error";
        }
    }
);

const initialState = {
    user: JSON.parse(window.localStorage.getItem("user")) || null ,
    status: "idle",
    isLoading: false,
    error: null,
    message: "",
};
// Slice to manage user state
const userSlice = createSlice({
    name: "user",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                window.localStorage.setItem("user", JSON.stringify(action.payload.user));
                state.user =  JSON.parse(window.localStorage.getItem("user"));
                state.message = action.payload.message;
                
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Login failed";
                state.message = action.payload.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                window.localStorage.setItem("user", JSON.stringify(action.payload.user));
                state.user =  JSON.parse(window.localStorage.getItem("user"));
                state.message = action.payload.message;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Signup failed"; // Error message from backend
                state.message = action.payload.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "succeeded";
                window.localStorage.removeItem("user");
                state.user = null; // Clear user data
            });
    }

});


// Export reducer
export default userSlice.reducer;
