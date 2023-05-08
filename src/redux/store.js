import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer"

const store = configureStore({
    reducer:{
        user:userReducer,
    },
});

export default store;

export const server = "https://6780-39-48-222-11.ngrok-free.app";