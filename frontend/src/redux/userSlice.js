import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, loginAPI, logoutAPI, getUserAPI } from "./userAPI";


export const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
    try {
        const response = await getUserAPI(); 
        return response.user;
    } catch (error) {
        console.log("Error fetching user:", error); 
        return rejectWithValue(error.response?.data?.message || "Error fetching user");
    }
});

// Async action to sign up the user
export const signupUser = createAsyncThunk(
    "user/signupUser",

    async (userData, { dispatch }) => {
        try {
            const data = await signupAPI(userData);
            if (data.success) {
                await dispatch(getUser());
            }
            return data;
        } catch (error) {
            return "Signup failed due to server error";
        }
    }
);


// Async action to log in the user
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials, { dispatch }) => {
        try {
            const data = await loginAPI(credentials);
            if (data.success) {
                await dispatch(getUser());
            }
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
                return null;
            }
        } catch (error) {
            return "Logout failed due to server error";
        }
    }
);

const initialState = {
    user: null,
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
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = null;
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Login failed";
                state.message = action.payload.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Signup failed";
                state.message = action.payload.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null; 
            });
    }

});


// Export reducer
export default userSlice.reducer;
