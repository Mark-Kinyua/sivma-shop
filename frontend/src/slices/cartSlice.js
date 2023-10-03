import { createSlice } from "@reduxjs/toolkit";

// Store data in local storage so that it is persistent
const initialState = localStorage.getItem("cart") ? JSON.parse
    (localStorage.getItem("cart")) : { cartItems: [] };


const addDecimals = (num) => {
    return (Math.round(num * 100 / 100).toFixed(2))
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducer: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            // Update the quantity
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate the Items Price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // Calculate the Shipping Price (Ir order > 1000, its free else 150)
            state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 150)

            // Calculate the Tax Price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            // Calculate the Total Price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        }
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;