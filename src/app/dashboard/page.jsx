"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobs, fetchMyJobs } from "../GlobalRedux/Features/jobs/JobsSlice";
import { fetchMyProfile } from "../GlobalRedux/Features/profile/ProfileSlice";
import { useSelector } from "react-redux";
import Card from "@/components/Card/Card";
import FindPeople from "@/app/findpeople/page";

const Page = () => {
  const dispatch = useDispatch();

  const loggedInUserId = useSelector((state) => state?.auth?.user?.user.id);

  const userProfile = useSelector((state) => state?.profiles?.profiles[0]);

  const { jobs } = useSelector((state) => state.jobs);

  const [isRecruiter, setIsRecruiter] = useState(false);
  console.log("jobs", jobs);
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
              {isRecruiter ? "Your Jobs" : "All Jobs"}
            </h1>
          </div>
        </div>
        {jobs &&
          jobs.map((job, idx) => {
            return <Card key={idx} job={job} isRecruiter={isRecruiter} />;
          })}
      </div>
    </div>
  );
};

export default Page;
