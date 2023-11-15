"use client";
import { useState } from "react";
import { fetchJobs } from "./GlobalRedux/Features/jobs/JobsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);

  useState(() => {
    const jobs = async () => {
      if (jobs.length > 0) return;
      await dispatch(fetchJobs(jobs));
    };
    dispatch(fetchJobs());
  }, []);
  console.log(jobs);

  return (
    <main>
      <div className="w-full h-full flex flex-col py-10">
        <div>
          <h1 className="text-center font-bold text-2xl"> All Jobs</h1>
        </div>
      </div>
    </main>
  );
}
