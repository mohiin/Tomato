import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/config";


export const fetchAllFoods = createAsyncThunk(
    "food/fetchAllFoods", async () => {
        try {
            const url = `${backendUrl}/food/all`;  // Assuming your endpoint for all foods is "/foods"
            const response = await axios.get(url);
            const data = response.data;

            if (data.success) {
                return data;  // Returning the fetched food data
            } else {
                console.log("Error fetching food items:", data.message);
                return []
            }
        } catch (error) {
            console.log("fetch food error:", error);
            // return rejectWithValue(error);
        }
    }
);


export const searchFood = createAsyncThunk(
    "food/searchFood", async (foodname, { rejectWithValue }) => {
        try {
            // Construct the search URL dynamically
            let url = `${backendUrl}/food/search/${foodname}`;
            const response = await axios.get(url);
            const data = response.data;

            if (data.success) {
                // Handle the success response
                return data.data;
            } else {
                // Handle the error
                console.log("Error fetching food items:", data.message);
                return [];
            }
        } catch (error) {
            console.log("Search food error:", error);
            // return 
        }
    }
);

const initialState = {
    foodList: [],
    error: null,
    isLoading: false,
}

const foodSearchSlice = createSlice({
    name: "food",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFoods.fulfilled, (state, action) => {
                state.foodList = action.payload.data;  // Set the fetched foods to foodList
                state.isLoading = false;
            })
            .addCase(fetchAllFoods.pending, (state) => {
                state.isLoading = true;  // Set loading state to true while fetching
            })
            .addCase(fetchAllFoods.rejected, (state, action) => {
                state.error = "Error fetching all foods";  // Set error state if failed
                state.isLoading = false;
            })
            .addCase(searchFood.fulfilled, (state, action) => {
                state.foodList = action.payload;
                state.isLoading = false;
            })
            .addCase(searchFood.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchFood.rejected, (state, action) => {
                state.error = action.payload || "Error during serach food";
                state.isLoading = false;
            })
    }
});

export default foodSearchSlice.reducer; 
