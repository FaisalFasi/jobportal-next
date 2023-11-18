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
  // NEW USER
  "auth/signUp",
  async ({ email, password, role }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // if successful, we create a "profiles" table entry for the new user
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert([{ user_id: data.user.id, role }])
      .single()
      .select("*");

    // A "user/human-being" has an entry in the user table and the profiles table.

    return data.user;
  }
);
export const loginWithEmailPassword = createAsyncThunk(
  // EXISTING USER
  "auth/signInWithPassword",
  async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
});

// export const getUserData = createAsyncThunk("auth/getUserData", async () => {
//   try {
//     const { data, error } = await supabase.auth.getUser();
//     const user = data.user;

//     console.log("user: ", user);

//     if (error) {
//       throw new Error(error.message);
//     }
//     return user;
//   } catch (error) {
//     console.log("error: ", error);
//   }
// });

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",

  async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }
    return data.session;
  }
);

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
        // console.log("action.payload: ", action.payload);
        // console.log("isAuthenticated ", state.isAuthenticated);
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
