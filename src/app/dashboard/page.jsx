"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../GlobalRedux/Features/jobs/JobsSlice";
import { useSelector } from "react-redux";
const page = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  // useEffect(() => {
  //   console.log("jobs", jobs);
  // }, [jobs]);

  return (
    <div>
      <div className="w-full min-h-screen bg-gray-100 p-8 ">
        <div className="pt-4">
          <h1> Dashboard</h1>
          <h1> Jobs</h1>
        </div>
        {jobs &&
          jobs.map((job) => {
            return (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row gap-6 items-start mt-8 bg-white shadow-md p-4 rounded-md"
              >
                <div> company icon</div>

                <div className="w-full flex flex-col gap-4 ">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">{job.title}</h2>
                      <p className="text-sm">{job.company_name}</p>
                    </div>
                  </div>
                  <div className=" text-end">
                    <button> open menu </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;

{
  /* <div className="flex flex-col sm:flex-row gap-6 items-start mt-8 bg-white shadow-md p-4 rounded-md">
          <div> company icon</div>

          <div className="w-full flex flex-col gap-4 ">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <h2 className="font-semibold text-lg">
                  Internship Frontend Entwicklung (m/w/d) für SaaS Startu
                </h2>
                <p className="text-sm">Company Name</p>
              </div>
            </div>
            <div className=" text-end">
              <button> open menu </button>
            </div>
          </div>
        </div> */
}
