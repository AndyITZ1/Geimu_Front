import { configureStore, createReducer } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import flagsReducer from './flagSlice';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        flags: flagsReducer,
        products: productsReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
