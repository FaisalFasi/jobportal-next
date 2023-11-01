"use client";
// supabase auth function / auth0 / sql queries for profile /

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eequjlhcvbgvssriesof.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcXVqbGhjdmJndnNzcmllc29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2Mjc0NTcsImV4cCI6MjAxNDIwMzQ1N30.vYK4TgiIKVwVh2FX1fqMMk1oJB1Znm-tEqhMiWHoanc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log(data, error);
  if (error) {
    alert(error.message);
    return null;
  }

  return data;
}
export async function signInWithEmail(email, password) {
  try {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      return error;
    }
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("An error occurred during sign-in.");
    return null;
  }
}

export const getMyProfile = async () => {
  const session = await supabase.auth.getSession();

  // console.log(session);

  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("id", user.id)
  //   .single();
  return session;
};

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
    return null;
  }
}

// Login with email and password
export async function loginWithEmail(email, password) {
  const res = await signInWithEmail(email, password);
  console.log(res);
  return res;
}
// registerRecruiter with email and password
export async function registerRecruiter(email, password) {
  const res = await signUpNewUser(email, password);
  //... do Recruiter setup stuff...
  return res;
}

// registerJobSeeker with email and password
export async function registerJobSeeker(email, password) {
  const res = await signUpNewUser(email, password);
  console.log(res.email, res.password);
  //... do JobSeeker setup stuff...
  return res;
}

// createUser;
// login;
// logout;
// resetPassword;
// updateUser;
// getUser;
// getUsers;
