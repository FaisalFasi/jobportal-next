"use client";
// supabase auth function / auth0 / sql queries for profile /

import supabase from "./Supabase";

export async function signUpNewUser(email, password) {
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
