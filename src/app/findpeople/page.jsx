"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobSeekers,
  fetchMyProfile,
  fetchRecruiters,
} from "../GlobalRedux/Features/profile/ProfileSlice";

const Page = () => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state?.auth?.user?.user?.id);

  const getCurrentUser = useSelector(
    (state) => state?.profiles?.currentUser?.[0]?.role
  );
  const people_profiles = useSelector((state) => state.profiles.profiles);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const asyncWrapper = async () => {
      if (!loggedInUserId) return;
      await dispatch(fetchMyProfile(loggedInUserId));

      if (getCurrentUser === "recruiter") {
        await dispatch(fetchJobSeekers());
      } else {
        await dispatch(fetchRecruiters());
      }
    };
    asyncWrapper();
  }, [dispatch, loggedInUserId, getCurrentUser]);

  useEffect(() => {
    setFilteredPeople(people_profiles);
  }, [people_profiles]);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === "") {
      setFilteredPeople(people_profiles);
    } else {
      const filtered = people_profiles.filter((person) =>
        person?.name?.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
      );
      setFilteredPeople(filtered);
    }

    setExpandedCard(null); // Close any open card on search
  };

  const handleCardClick = (id) => {
    setExpandedCard((prevId) => (prevId === id ? null : id));
  };

  const handleCloseButtonClick = () => {
    setExpandedCard(null);
  };

  return (
    <div className="px-2 md:px-8 mx-auto mt-8">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>

      {/* Display profiles */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPeople.map((person) => (
          <div key={person.id} className="bg-gray-200 p-4 rounded-md">
            <div
              onClick={() => handleCardClick(person.id)}
              className="cursor-pointer"
            >
              <h3 className="text-lg font-bold mb-2">
                Name: {person?.name || "empty"}
              </h3>
              <p>Email: {person.email || "empty"}</p>
              <p>Phone No: {person.phone}</p>
            </div>

            {/* Expanded card content */}
            {expandedCard === person.id && (
              <div className="flex flex-col gap-8 mt-4">
                <p>Professional Summary: {person.description || "empty"}</p>
                <div>
                  <h3 className="text-lg font-bold mb-2">Professional Links</h3>
                  <p>LinkedIn: {person.skills || "empty"}</p>
                  <p>Github: {person.skills || "empty"}</p>
                  <p>Portfolio Website: {person.skills || "empty"}</p>
                </div>
                <button
                  onClick={handleCloseButtonClick}
                  className="w-fit mt-2 bg-red-500 text-white p-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchJobSeekers,
//   fetchMyProfile,
//   fetchRecruiters,
// } from "../GlobalRedux/Features/profile/ProfileSlice";

// const Page = () => {
//   const dispatch = useDispatch();

//   const loggedInUserId = useSelector((state) => state?.auth?.user?.user?.id);

//   const getCurrentUser = useSelector(
//     (state) => state?.profiles?.currentUser?.[0]?.role
//   );

//   console.log("getCurrentUser: ", getCurrentUser);

//   const jobSeekerProfiles = useSelector((state) => state.profiles.profiles);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredPeople, setFilteredPeople] = useState([]);
//   const [expandedCard, setExpandedCard] = useState(null);

//   useEffect(() => {
//     const asyncWrapper = async () => {
//       if (!loggedInUserId) return;
//       await dispatch(fetchMyProfile(loggedInUserId));

//       if (getCurrentUser === "recruiter") {
//         await dispatch(fetchJobSeekers());
//       } else {
//         await dispatch(fetchRecruiters());
//       }
//     };
//     asyncWrapper();
//   }, [dispatch, loggedInUserId]);

//   useEffect(() => {
//     setFilteredPeople(jobSeekerProfiles);
//   }, [jobSeekerProfiles]);

//   const handleSearch = () => {
//     const trimmedSearchTerm = searchTerm.trim();

//     if (trimmedSearchTerm === "") {
//       setFilteredPeople(jobSeekerProfiles);
//     } else {
//       const filtered = jobSeekerProfiles.filter((person) =>
//         person?.name?.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
//       );

//       setFilteredPeople(filtered);
//     }

//     setExpandedCard(null); // Close any open card on search
//   };

//   const handleCardClick = (id) => {
//     setExpandedCard(expandedCard === id ? null : id);
//   };

//   const handleCloseButtonClick = () => {
//     setExpandedCard(null);
//   };

//   return (
//     <div className="px-2 md:px-8 mx-auto mt-8">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 mr-2"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
//           Search
//         </button>
//       </div>
//       <div className="grid grid-cols-1 gap-4">
//         {filteredPeople.map((person) => (
//           <div key={person.id} className="bg-gray-200 p-4 rounded-md">
//             <div
//               onClick={() => handleCardClick(person.id)}
//               className="cursor-pointer"
//             >
//               <h3 className="text-lg font-bold mb-2">
//                 Name: {person?.name || "empty"}
//               </h3>
//               <p>Email: {person.email || "empty"}</p>
//               <p>Phone No: {person.phone}</p>
//             </div>
//             {expandedCard === person.id && (
//               <div className="flex flex-col gap-8 mt-4">
//                 <p>Professional Summary: {person.description || "empty"}</p>
//                 <div>
//                   <h3 className="text-lg font-bold mb-2">Professional Links</h3>
//                   <p>LinkedIn: {person.skills || "empty"}</p>

//                   <p>Github: {person.skills || "empty"}</p>
//                   <p>Portfolio Website: {person.skills || "empty"}</p>
//                 </div>
//                 <button
//                   onClick={handleCloseButtonClick}
//                   className="w-fit mt-2 bg-red-500 text-white p-2"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;
