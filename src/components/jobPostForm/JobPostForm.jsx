"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  createJob,
  updateJob,
} from "@/app/GlobalRedux/Features/jobs/JobsSlice";

import "@/app/globals.css";
import Button from "../Button/Button";
const JobPostForm = ({ onClose, loggedInUserId, job }) => {
  const dispatch = useDispatch();

  const isUpdating = !!job?.id;

  const [jobDetails, setJobDetails] = useState({
    id: job?.id,
    title: job?.title || "",
    description: job?.description || "",
    recruiter_id: job?.recruiter_id || loggedInUserId?.toString() || "",
    email: job?.email || "",
    company_name: job?.company_name || "",
    company_url: job?.company_url || "",
    language_required: job?.language_required || "",
    salary: job?.salary || "",
    location: job?.location || "",
    status: job?.status || "Draft",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleAddJob = async () => {
    await dispatch(createJob(jobDetails));
    onClose();
  };

  const updateJobDetails = async () => {
    await dispatch(updateJob(jobDetails));
    onClose();
  };

  const handleWheel = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed flex justify-center items-center top-0 w-full h-full bg-black bg-opacity-50 text-white overflow-hidden ">
      <div
        className="h-[calc(100%-100px)] md:h-auto popup-color m-8 rounded-md p-8  overflow-y-auto
        "
        onWheel={handleWheel} // Prevent the wheel event from reaching elements behind the popup
      >
        <div>
          <div className="font-bold text-2xl">Add Job</div>
          <div className="flex flex-wrap items-start justify-around gap-4 mt-8 p-4  ">
            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className="  text-sm font-bold ">Job Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter job title"
                value={jobDetails.title}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>
            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className="  text-sm font-bold ">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={jobDetails.email}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>
            <div className=" w-full md:w-2/5 flex flex-col   items-start justify-start gap-4 ">
              <label className=" text-sm font-bold ">Company Name:</label>
              <input
                type="text"
                name="company_name"
                placeholder="Enter company name"
                value={jobDetails.company_name}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className="  text-sm font-bold ">Language Required:</label>
              <input
                type="text"
                name="language_required"
                placeholder="Enter language required"
                value={jobDetails.language_required}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className="  text-sm font-bold ">Company URL:</label>
              <input
                type="text"
                name="company_url"
                placeholder="Enter company url"
                value={jobDetails.company_url}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className="  text-sm font-bold ">Location:</label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={jobDetails.location}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>
            <div className=" w-full  flex flex-col  items-start justify-start gap-4  md:mx-20 ">
              <label className="  text-sm font-bold ">Job Description:</label>
              <textarea
                name="description"
                placeholder="Enter job description"
                value={jobDetails.description}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600 "
              ></textarea>
            </div>
            <div className=" w-full flex flex-col  items-center justify-center gap-4  ">
              <div className="my-8 flex gap-8">
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Publish"
                    name="status"
                    value={"Publish"}
                    checked={jobDetails.status === "Publish"}
                    onChange={handleInputChange}
                  />
                  <label> Publish</label>
                </div>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    id="Draft"
                    name="status"
                    value={"Draft"}
                    checked={jobDetails.status === "Draft"}
                    onChange={handleInputChange}
                  />
                  <label>Draft</label>
                </div>
              </div>
            </div>
            <div className="flex gap-8 justify-end">
              <Button
                text={"Post Job"}
                onClick={isUpdating ? updateJobDetails : handleAddJob}
              />
              <Button text={"Cancel"} onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
