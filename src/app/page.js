"use client";
import { useEffect } from "react";
import { fetchJobs } from "./GlobalRedux/Features/jobs/JobsSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card/Card";
import Search from "@/components/search/Search";

export default function Home() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  useEffect(() => {
    const fetchJobsData = async () => {
      await dispatch(fetchJobs());
    };

    fetchJobsData();
  }, [dispatch, jobs]);

  return (
    <main className="w-full min-h-screen p-8">
      <Search />

      <div>
        {jobs?.map((job, idx) => (
          <Card key={idx} job={job} />
        ))}
      </div>
    </main>
  );
}
