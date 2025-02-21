
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCartAPI, getCartDataAPI, removeFromCartAPI } from "./cartAPI";

export const getCartData = createAsyncThunk(
  "cart/cartData",
  async (user) => {
    const data = await getCartDataAPI(user);
    return data;
  }
)

// Async thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, item }) => {
    const payload = { userId, item };
    const data = await addToCartAPI(payload);
    return data;
  }
);

// Async thunk for removing an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, itemId }) => {
    const payload = { userId, itemId };
    const data = await removeFromCartAPI(payload);
    return data;
  }
);


const initialState = {
  cartData: [],
  totalAmount: 0,
  error: null,
  isLoading: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // Clears the entire cart
      state.cartData = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getCartData2 actions
      .addCase(getCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload;
        state.totalAmount = state.cartData ? state.cartData.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.cartData = [];
      })

      // Handle addToCart actions
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload.cartData;
        state.totalAmount = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Handle removeFromCart actions
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload.cartData;
        state.totalAmount = state.cartData ? state.cartData.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;


