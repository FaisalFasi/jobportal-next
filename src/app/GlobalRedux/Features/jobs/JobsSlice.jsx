"use client";
// jobs/JobsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/services/Supabase";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .range(0, 10);
    console.log("Jobs Data: " + data);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
});

const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // Add any additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = action.error.message;
      });
  },
});

export default JobsSlice.reducer;
