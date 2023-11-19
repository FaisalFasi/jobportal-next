"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/services/Supabase";

const initialState = {
  currentUser: null,
  profiles: [],
  loading: false,
  error: null,
};

export const fetchMyProfile = createAsyncThunk(
  "profiles/fetchMyProfile",
  async (loggedInUserId) => {
    try {
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", loggedInUserId);

      if (error) {
        throw new Error(error.message);
      }
      console.log("data: ", data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",

  async (updateUserData) => {
    try {
      //   console.log("updateUserData: ", updateUserData);
      const { data, error } = await supabase
        .from("profiles")
        .update(updateUserData)
        .eq("user_id", updateUserData.user_id);

      //   console.log("updated profile data: " + data);
      if (error) {
        throw new Error(error.message);
      }
      return data[0];
    } catch (error) {
      throw error;
    }
  }
);

export const fetchJobSeekers = createAsyncThunk(
  "profiles/fetchJobSeekers",
  async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "jobseeker");

      // console.log("job seeker data: ", data);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRecruiters = createAsyncThunk(
  "profiles/fetchRecruiters",
  async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "recruiter");

      console.log("job seeker data: ", data);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const ProfileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
        state.currentUser = action.payload;
        console.log("state.currentUser: ", state.currentUser);
        state.error = null;
        // console.log("state: ", state.profiles);
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.profiles = [];
        state.error = action.error.message;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        // console.log("Before <<<<<: ", action.payload);

        const updatedProfileIndex = state.profiles.findIndex(
          (profile) => profile.user_id === action.payload?.user_id
        );

        if (updatedProfileIndex !== -1) {
          state.profiles[updatedProfileIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        // console.log("action.error.message: ", action.error.message);
        state.error = action.error.message;
      })
      .addCase(fetchJobSeekers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobSeekers.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload: ", action.payload);
        state.profiles = action.payload;
        state.error = null;
      })
      .addCase(fetchJobSeekers.rejected, (state, action) => {
        state.loading = false;
        state.profiles = [];
        state.error = action.error.message;
      })
      .addCase(fetchRecruiters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecruiters.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
        state.error = null;
      })
      .addCase(fetchRecruiters.rejected, (state, action) => {
        state.loading = false;
        state.profiles = [];
        state.error = action.error.message;
      });
  },
});

export default ProfileSlice.reducer;
