"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchMyJobs } from "../GlobalRedux/Features/jobs/JobsSlice";
import { fetchMyProfile } from "../GlobalRedux/Features/profile/ProfileSlice";
import Card from "@/components/Card/Card";
import Search from "@/components/search/Search";

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
      <Search />
      <div className="w-full min-h-screen bg-gray-100 p-8">
        <div className="pt-4">
          <div>
            <h1 className="text-center font-bold text-2xl">
              {isRecruiter ? "Your Jobs" : "All Jobs"}
            </h1>
          </div>
        </div>
        {isRecruiter ? (
          <div>
            {jobs?.filter((job) => job.status === "Draft").length > 0 ? (
              <div>
                <h1>Drafts</h1>
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
                <h1>Published</h1>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobs, fetchMyJobs } from "../GlobalRedux/Features/jobs/JobsSlice";
// import { fetchMyProfile } from "../GlobalRedux/Features/profile/ProfileSlice";
// import Card from "@/components/Card/Card";

// const Page = () => {
//   const dispatch = useDispatch();
//   const loggedInUserId = useSelector((state) => state?.auth?.user?.user.id);
//   const userProfile = useSelector((state) => state?.profiles?.profiles[0]);
//   const { jobs } = useSelector((state) => state.jobs);
//   const [isRecruiter, setIsRecruiter] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (loggedInUserId) {
//         await dispatch(fetchMyProfile(loggedInUserId));
//       }
//     })();
//   }, [loggedInUserId]);

//   useEffect(() => {
//     (async () => {
//       if (userProfile) {
//         if (userProfile.role === "recruiter") {
//           await dispatch(fetchMyJobs(loggedInUserId));
//           setIsRecruiter(true);
//         } else {
//           await dispatch(fetchJobs());
//           setIsRecruiter(false);
//           console.log("userProfile?.role", userProfile.role);
//         }
//       }
//     })();
//   }, [jobs, userProfile]);

//   return (
//     <div>
//       <div className="w-full min-h-screen bg-gray-100 p-8">
//         <div className="pt-4">
//           <div>
//             <h1 className="text-center font-bold text-2xl">
//               {isRecruiter ? "Your Jobs" : "All Jobs"}
//             </h1>
//           </div>
//         </div>
//         {jobs?.map((job, idx) => (
//           <Card key={idx} {...{ job, isRecruiter }} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;
