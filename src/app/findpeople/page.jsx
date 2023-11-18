"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobSeekers } from "../GlobalRedux/Features/profile/ProfileSlice";

const Page = () => {
  const dispatch = useDispatch();
  const jobSeekerProfiles = useSelector((state) => state.profiles.profiles);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    dispatch(fetchJobSeekers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPeople(jobSeekerProfiles);
  }, [jobSeekerProfiles]);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === "") {
      // If search term is empty, return the entire array
      setFilteredPeople(jobSeekerProfiles);
    } else {
      // If search term is not empty, filter the array
      const filtered = jobSeekerProfiles.filter((person) =>
        person?.name?.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
      );

      setFilteredPeople(filtered);
    }

    setExpandedCard(null); // Close any open card on search
  };

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCloseButtonClick = () => {
    setExpandedCard(null);
  };

  return (
    <div className="px-2 md:px-8 mx-auto mt-8">
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
      <div className="grid grid-cols-1 gap-4">
        {filteredPeople.map((person) => (
          <div key={person.id} className="bg-gray-200 p-4 rounded-md">
            <div
              onClick={() => handleCardClick(person.id)}
              className="cursor-pointer"
            >
              <h3 className="text-lg font-bold mb-2">Name: {person.name}</h3>
              <p>Email: {person.email}</p>
              <p>Phone No: {person.phone}</p>
            </div>
            {expandedCard === person.id && (
              <div className="flex flex-col gap-8 mt-4">
                <p>Descriptions: {person.description}</p>
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
