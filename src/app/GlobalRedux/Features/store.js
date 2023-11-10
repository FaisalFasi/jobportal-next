"use client";
// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobs/JobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    // Add other reducers here if needed
  },
});
