// supabase auth function / auth0 / sql queries for profile /

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eequjlhcvbgvssriesof.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcXVqbGhjdmJndnNzcmllc29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2Mjc0NTcsImV4cCI6MjAxNDIwMzQ1N30.vYK4TgiIKVwVh2FX1fqMMk1oJB1Znm-tEqhMiWHoanc";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      redirectTo: "https//example.com/welcome",
    },
  });
  console.log(data, error);
  if (error) {
    alert(error.message);
    return null;
  }

  return data;
}
export async function registerJobSeeker(email, password) {
  const res = await signUpNewUser(email, password);
  console.log(res.email, res.password);
  //... do JobSeeker setup stuff...
}
export async function registerRecruiter(email, password) {
  const res = await signUpNewUser(email, password);
  //... do Recruiter setup stuff...
}
// createUser;
// login;
// logout;
// resetPassword;
// updateUser;
// getUser;
// getUsers;
