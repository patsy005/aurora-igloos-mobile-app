import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "./slices/bookingsSlice";

export const store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer
    }
})