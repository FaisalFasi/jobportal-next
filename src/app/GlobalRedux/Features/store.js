"use client";
// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./jobs/JobsSlice";
import AuthReducer from "./auth/AuthSlice";

export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    auth: AuthReducer,

    // Add other reducers here if needed
  },
});
