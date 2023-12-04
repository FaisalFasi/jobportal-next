"use client";
import { useEffect } from "react";
import { fetchJobs } from "./GlobalRedux/Features/jobs/JobsSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card";
import Search from "@/components/Search";

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
      {jobs.length > 0 ? (
        <Search />
      ) : (
        <div className="text-2xl text-center mt-40 font-bold text-red-500">
          !!! There is not any job posted yet !!!
        </div>
      )}

      <div>
        {jobs?.map((job, idx) => (
          <Card key={idx} job={job} />
        ))}
      </div>
    </main>
  );
}
