import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserResponse } from "../interfaces/UserResponse";

const BASE_URL: string = "http://localhost:5000/data/";

export const login = createAsyncThunk("auth/login", async (payload: any) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/login`, payload);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        const response = await axios.post<string>(`${BASE_URL}auth/logout`);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});

export const register = createAsyncThunk("auth/register", async (payload: any) => {
    try {
        const response = await axios.post<UserResponse>(`${BASE_URL}auth/register`, payload);
        console.log(response);
        return response.data;
    } catch (err: any) {
        throw new Error(err);
    }
});


const initialState = {
    user: {},
    status: "idle"
};

const usersSlice = createSlice({ 
    name: "users", // name of slice
    initialState: initialState, // init state that will be stored by this slice
    reducers: {  // actions/changes to state being performed
        getUserDataFromLocal(state) {
            // this retrieves user to be put in state
            state.user = JSON.parse(localStorage.getItem("user") || "{}");
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
     extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(logout.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = "success";
                localStorage.setItem("user", "{}");
                state.user = {};
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "rejected";
            })
            .addCase(register.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "rejected";
            })
     } 

});

export const getUser = (state: any) => state.users.user;

// export actions
export const { getUserDataFromLocal, setStatus } = usersSlice.actions;

export default usersSlice.reducer;