import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL: string = "http://localhost:5000/data/";

export const getAllProducts = createAsyncThunk("/products", async () => {
    try {
        const response = await axios.get(`${BASE_URL}products`);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

export const getProductById = createAsyncThunk("products/id", async (payload: any) => {
    try {
        const response = await axios.get(`${BASE_URL}products/product/${payload}`);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
})

const initialState = {
    products: {},
    currProduct: {},
    status: "idle"
};

const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        getProductsFromLocal(state) {
            state.products = JSON.parse(localStorage.getItem("products") || "{}");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                localStorage.setItem("products", JSON.stringify(action.payload));
                state.status = "Success";
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.currProduct = action.payload;
                state.status = "Success";
            })
    }
});

export const getProducts = (state: any) => state.products.products; 
export const getCurrProduct = (state: any) => state.products.currProduct;

export const { getProductsFromLocal } = productsSlice.actions;

export default productsSlice.reducer;