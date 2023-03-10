import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem } from "../interfaces/CartItem";


const cart : CartItem[] = [];
const initialState = {
    cart: cart,
    status: "idle"
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            state.cart.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        getCartFromLocal(state) {
            state.cart = JSON.parse(localStorage.getItem("cart") || "[]");
            console.log(state.cart);
        },
        clearCart(state) {
            state.cart = [];
            localStorage.setItem("cart", "[]");
        }
    }
});


export const getCart = (state: any) => state.cart.cart;

export const { addToCart, getCartFromLocal, clearCart } = cartSlice.actions;

export default cartSlice.reducer;