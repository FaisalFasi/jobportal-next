// getAllJobs / getJobById / createJob / updateJob / deleteJob / getJobsByRecruiterId

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://eequjlhcvbgvssriesof.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcXVqbGhjdmJndnNzcmllc29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2Mjc0NTcsImV4cCI6MjAxNDIwMzQ1N30.vYK4TgiIKVwVh2FX1fqMMk1oJB1Znm-tEqhMiWHoanc";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getAllJobs(...????) {
    let { data: jobs, error } = await supabase.from("jobs").select("*");
        console.log(error);
        console.log(jobs);
        return ????
}
async function getJobById(...????) {
    let { data: jobs, error } = await supabase.from("jobs").select("*");
        console.log(error);
        console.log(jobs);
        return ????
}
async function createJob(...????) {
    let { data: jobs, error } = await supabase.from("jobs").select("*");
        console.log(error);
        console.log(jobs);
        return ????
}
async function updateJob(...????) {
    let { data: jobs, error } = await supabase.from("jobs").select("*");
        console.log(error);
        console.log(jobs);
        return ????
}
async function deleteJob(...????) {
    let { data: jobs, error } = await supabase.from("jobs").select("*");
        console.log(error);
        console.log(jobs);
        return ????
}
async function getJobsByRecruiterId(...????) {
    let { data: jobs, error } = await supabase.from("jobs").select("*");
        console.log(error);
        console.log(jobs);
        return ????
}