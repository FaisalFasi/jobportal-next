"use client";
// jobs/JobsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/services/Supabase";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

export const searchJobs = createAsyncThunk(
  "jobs/searchJobs",

  async (searchTerm) => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .filter(
          "title_description_location_company",
          "ilike",
          `%${searchTerm}%`
        );

      console.log("data: ", data);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "Publish")
      .range(0, 10);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchMyJobs = createAsyncThunk(
  "jobs/fetchMyJobs",
  async (loggedInUserId) => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("recruiter_id", loggedInUserId)
        .range(0, 10);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createJob = createAsyncThunk("jobs/createJob", async (jobData) => {
  try {
    console.log("Request Payload: ", [jobData]);
    const { data, error } = await supabase.from("jobs").insert(jobData);
    console.log("Jobs Data: " + data);

    if (error) {
      console.error("Supabase Error: ", error);
    }
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateJob = createAsyncThunk("jobs/updateJob", async (jobData) => {
  try {
    const { error: upsertError } = await supabase
      .from("jobs")
      .upsert([jobData]);

    if (upsertError) {
      console.error("Supabase Upsert Error: ", upsertError);
      throw upsertError;
    }

    // Fetch all jobs after the upsert
    const { data: jobsData, error: fetchError } = await supabase
      .from("jobs")
      .select("*");

    if (fetchError) {
      console.error("Supabase Fetch Error: ", fetchError);
      throw fetchError;
    }

    return jobsData;
  } catch (error) {
    throw error;
  }
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (jobData) => {
  try {
    console.log("jobData: ", jobData.id);
    const { data, error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobData.id.toString())
      .select("*");

    if (error) {
      console.error("Supabase Error: ", error);
      throw error;
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
      })
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = action.error.message;
      })
      .addCase(fetchMyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = action.error.message;
      })
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = action.error.message;
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(
          (job) => job.id !== action.payload[0].id
        );
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = action.error.message;
      });
  },
});

export default JobsSlice.reducer;
