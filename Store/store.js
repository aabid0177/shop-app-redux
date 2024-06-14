
import productReducers from "./reducers/productReducers";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
    reducer: {
        collection: productReducers
    }
})