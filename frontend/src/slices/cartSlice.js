import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Store data in local storage so that it is persistent
const initialState = localStorage.getItem('cart') ? JSON.parse
    (localStorage.getItem('cart')) : { cartItems: [] };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            // Update the quantity
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            return updateCart(state);

        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;