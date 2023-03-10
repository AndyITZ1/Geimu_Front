import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://flagcdn.com/";

export const getCountries = createAsyncThunk("/countries", async () => {
    try {
        const response = await axios.get(`${BASE_URL}en/codes.json`);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

const initialState = {
    countryCodes: {},
    userFlag: {},
    status: "idle"
};

const flagsSlice = createSlice({
    name: "flags",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCountries.fulfilled, (state, action) => {
            state.countryCodes = action.payload;
        })
    },
});

export default flagsSlice.reducer;