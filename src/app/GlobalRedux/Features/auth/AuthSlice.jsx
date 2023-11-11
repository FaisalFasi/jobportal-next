"use client";
// auth/AuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/services/Supabase";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);
export const loginWithEmailPassword = createAsyncThunk(
  "auth/signInWithPassword",
  async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    console.log("data: ", data);
    console.log("error: ", error);

    return data;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  localStorage.removeItem("user");
});

export const getUserData = createAsyncThunk("auth/getUserData", async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    const user = data.user;

    console.log("user: ", user);
    console.log("data: ", data);
    console.log("error: ", error);
    if (error) {
      throw new Error(error.message);
    }
    return user;
  } catch (error) {
    console.log("error: ", error);
  }
});

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",

  async () => {
    const { data, error } = await supabase.auth.getSession();

    console.log(data.session);
    console.log("Data: ", data);

    if (error) {
      throw new Error(error.message);
    }
    return data.session;
  }
);

// export const getSession = createAsyncThunk("auth/getSesstion", async () => {
//   const session = await supabase.auth.getSession();

//   console.log("Session: ", session);

//   return session;
// });

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add any additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(loginWithEmailPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        console.log("action.payload: ", action.payload);
        console.log("isAuthenticated ", state.isAuthenticated);
        state.user = action.payload;

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })

      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
    // .addCase(getSession.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    //   state.isAuthenticated = true;
    //   state.error = null;
    // });
  },
});

export default AuthSlice.reducer;
