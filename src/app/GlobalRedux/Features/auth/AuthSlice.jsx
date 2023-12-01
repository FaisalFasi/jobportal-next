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
// export const signUp = createAsyncThunk(
//   "auth/signUp",
//   async ({ email, password, role }) => {
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (error) {
//         return error;
//       } else {
//         const { data: profileData, error: profileError } = await supabase
//           .from("profiles")
//           .insert([{ user_id: data.user.id, role }])
//           .single()
//           .select("*");
//         console.log("Sign up profileData: ", profileData);
//       }

//       return data.user;
//     } catch (error) {
//       console.log("Error in signup: ", error);
//       throw new Error(error.message);
//     }
//   }
// );

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, role }) => {
    try {
      // Check if the email already exists
      const { data: existingUser, error: emailError } =
        await supabase.auth.api.getUserByEmail(email);

      if (existingUser) {
        throw new Error(
          "Email already exists in the database. Please log in instead of signing up again or use a different email address to sign up."
        );
      }

      // Proceed with user registration
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return error;
      } else {
        // Create a "profiles" table entry for the new user
        const { data: profileData, profileError } = await supabase
          .from("profiles")
          .insert([{ user_id: data.user.id, role }])
          .single()
          .select("*");
        console.log("Sign up profileData: ", profileData);
      }

      return data.user;
    } catch (error) {
      return error.message;
      // throw new Error(error.message);
    }
  }
);

export const loginWithEmailPassword = createAsyncThunk(
  // EXISTING USER
  "auth/signInWithPassword",
  async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
});

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",

  async () => {
    const { data, error } = await supabase.auth.getSession();

    console.log("fetchUserData", data);
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
        state.user = action.payload;
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
  },
});

export default AuthSlice.reducer;
