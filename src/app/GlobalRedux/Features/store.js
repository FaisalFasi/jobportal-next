"use client";
// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./jobs/JobsSlice";
import AuthReducer from "./auth/AuthSlice";
import ProfileReducer from "./profile/ProfileSlice";
export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    auth: AuthReducer,
    profiles: ProfileReducer,
    // Add other reducers here if needed
  },
});
