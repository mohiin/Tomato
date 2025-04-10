import { configureStore  } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import formReducer from "./formSlice.js";
import userReducer from "./userSlice.js"
import foodReducer from "./foodSlice.js";

const store = configureStore({
    reducer:{
        cart : cartReducer,
        showForm : formReducer,
        user: userReducer,
        food: foodReducer,
    }
});

export default  store;