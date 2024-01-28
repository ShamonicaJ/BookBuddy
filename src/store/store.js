import { configureStore } from "@reduxjs/toolkit";
import api from "./api";

import authReducer from '../components/account/AuthSlice';




const store = configureStore({
    reducer: {
        api: api.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddle) =>
        getDefaultMiddle().concat(api.middleware)
})


export default store;

