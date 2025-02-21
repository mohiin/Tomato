
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenLogin: false,
    isOpenSignup: false,
}

const formSlice = createSlice({
    name: "showForm",
    initialState,
    reducers: {
        openLoginForm: (state) => {
            state.isOpenLogin = !state.isOpenLogin;
            state.isOpenSignup = false;
        },
        
        openSignupForm: (state)=>{
            state.isOpenSignup = !state.isOpenSignup;
            state.isOpenLogin = false; // Close login form when signup form opens
        },
    
    }
})

export const { openSignupForm, openLoginForm } = formSlice.actions;
export default formSlice.reducer;