"use client";
import { useState } from "react";
import { fetchJobs } from "./GlobalRedux/Features/jobs/JobsSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card/Card";
import Search from "@/components/search/Search";

export default function Home() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  useState(() => {
    const wrapper = async () => {
      if (jobs.length > 0) return;
      await dispatch(fetchJobs());
    };
    wrapper();
    // dispatch(fetchJobs());
  }, []);
  console.log(jobs.jobs);

  return (
    <main className="w-full min-h-screen p-8">
      <Search />
      <div>
        {jobs?.map((job, idx) => (
          <Card key={idx} job={job} />
          // <Card key={idx} job={job} isRecruiter={isRecruiter} /> its same like above
        ))}
      </div>
    </main>
  );
}
