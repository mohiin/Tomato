
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
            state.isOpenLogin = true;  
            state.isOpenSignup = false;
        },
        openSignupForm: (state) => {
            state.isOpenSignup = true; 
            state.isOpenLogin = false;
        },
        closeForms: (state) => {
            state.isOpenLogin = false;
            state.isOpenSignup = false;
        }
    
    }
})

export const { openSignupForm, openLoginForm, closeForms } = formSlice.actions;
export default formSlice.reducer;