"use client";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchMyJobs } from "../GlobalRedux/Features/jobs/JobsSlice";
import { fetchMyProfile } from "../GlobalRedux/Features/profile/ProfileSlice";
import Card from "@/components/Card";
import Search from "@/components/Search";

const Page = () => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state?.auth?.user?.user.id);
  const userProfile = useSelector((state) => state?.profiles?.profiles[0]);
  const { jobs } = useSelector((state) => state.jobs);

  const isRecruiter = useMemo(
    () => userProfile?.role === "recruiter",
    [userProfile]
  );

  useEffect(() => {
    if (loggedInUserId) {
      dispatch(fetchMyProfile(loggedInUserId));
    }
  }, [dispatch, loggedInUserId]);

  useEffect(() => {
    if (userProfile) {
      if (isRecruiter) {
        dispatch(fetchMyJobs(loggedInUserId));
      } else {
        dispatch(fetchJobs());
      }
    }
  }, [dispatch, loggedInUserId, isRecruiter, userProfile]);

  return (
    <div>
      <div className="w-full min-h-screen p-8">
        {jobs?.length > 0 && <Search />}

        <div className="pt-4">
          <div>
            <h1 className="text-center font-bold text-2xl">
              {isRecruiter ? "Your Posted Jobs" : "All Jobs"}
            </h1>
          </div>
        </div>
        {isRecruiter && jobs?.length === 0 && (
          <div className="text-xl text-center mt-10 font-bold text-red-500">
            !!! You have posted 0 jobs !!!
          </div>
        )}
        {isRecruiter ? (
          <div className="h-full">
            {jobs?.filter((job) => job.status === "Draft").length > 0 ? (
              <div>
                <h1 className="text-lg font-bold pt-8">Drafts</h1>
                <div>
                  {jobs
                    .filter((job) => job.status === "Draft")
                    .map((job, idx) => (
                      <Card key={idx} {...{ job, isRecruiter }} />
                    ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {jobs?.filter((job) => job.status === "Publish").length > 0 ? (
              <div>
                <h1 className="text-lg font-bold pt-8">Published</h1>
                <div>
                  {jobs
                    .filter((job) => job.status === "Publish")
                    .map((job, idx) => (
                      <Card key={idx} {...{ job, isRecruiter }} />
                    ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>
            {jobs?.map((job, idx) => (
              <Card key={idx} {...{ job, isRecruiter }} />
              // <Card key={idx} job={job} isRecruiter={isRecruiter} /> its same like above
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
