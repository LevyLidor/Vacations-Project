import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"

const myStore = configureStore({
    reducer: {
        userReducer,
    }
})


export default myStore;