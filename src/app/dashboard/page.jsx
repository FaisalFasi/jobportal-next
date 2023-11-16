"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobs, fetchMyJobs } from "../GlobalRedux/Features/jobs/JobsSlice";
import { fetchMyProfile } from "../GlobalRedux/Features/profile/ProfileSlice";
import { useSelector } from "react-redux";
import Button from "@/components/Button/Button";

const Page = () => {
  const dispatch = useDispatch();

  const loggedInUserId = useSelector((state) => state?.auth?.user?.user.id);

  const userProfile = useSelector((state) => state?.profiles?.profiles[0]);

  const { jobs } = useSelector((state) => state.jobs);

  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    const asyncWrapper = async () => {
      if (!loggedInUserId) return;

      await dispatch(fetchMyProfile(loggedInUserId));
      console.log("loggedInUserId", loggedInUserId);
    };
    asyncWrapper();
  }, [loggedInUserId]);

  useEffect(() => {
    const asyncWrapper = async () => {
      if (!userProfile) return;
      if (userProfile?.role === "recruiter") {
        await dispatch(fetchMyJobs(loggedInUserId));
        setIsRecruiter(true);
      } else {
        await dispatch(fetchJobs());
        setIsRecruiter(false);
        console.log("userProfile?.role", userProfile?.role);
      }
    };
    asyncWrapper();
  }, [userProfile]);

  return (
    <div>
      <div className="w-full min-h-screen bg-gray-100 p-8 ">
        <div className="pt-4">
          <div>
            <h1 className="text-center font-bold text-2xl">
              {isRecruiter ? "Posted Jobs" : "All Jobs"}
            </h1>
          </div>
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
                    <Button className="" text={"Apply"}></Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
