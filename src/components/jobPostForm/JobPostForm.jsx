import React, { useEffect, useState } from "react";

const JobPostForm = ({ onClose, onAddJob, loggedInUserId }) => {
  const [selectedOption, setSelectedOption] = useState("Select");

  const [status, setStatus] = useState("Draft");
  const [jobDetails, setJobDetails] = useState({
    // id: "",
    title: "",
    description: "",
    recruiter_id: loggedInUserId.toString(),
    email: "",
    company_name: "",
    company_url: "",
    language_required: "",
    salary: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddJob = () => {
    onAddJob(jobDetails);
    onClose();

    console.log("jobDetails: " + JSON.stringify(jobDetails));
  };
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="fixed flex justify-center items-center top-0 w-full h-full bg-black bg-opacity-50 text-white overflow-hidden ">
      <div
        className="h-[calc(100%-100px)] md:h-auto bg-gray-300 text-black m-8 rounded-md p-8  overflow-y-auto
        "
        onWheel={handleWheel} // Prevent the wheel event from reaching elements behind the popup
      >
        <div>
          <div className="font-bold text-2xl">Add Job</div>
          <div className="flex flex-wrap items-start justify-around gap-4 mt-8 p-4  ">
            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Job Title:
              </label>
              <input
                type="text"
                name="title"
                value={jobDetails.title}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>
            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={jobDetails.email}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>
            <div className=" w-full md:w-2/5 flex flex-col   items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Company Name:
              </label>
              <input
                type="text"
                name="company_name"
                value={jobDetails.company_name}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Language Required:
              </label>
              <input
                type="text"
                name="language_required"
                value={jobDetails.language_required}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Company URL:
              </label>
              <input
                type="text"
                name="company_url"
                value={jobDetails.company_url}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Location:
              </label>
              <input
                type="text"
                name="location"
                value={jobDetails.location}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>
            <div className=" w-full  flex flex-col  items-start justify-start gap-4  md:mx-20 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Job Description:
              </label>
              <textarea
                name="description"
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
                    value="Publish"
                    checked={status === "Publish"}
                    onChange={() => handleToggle("Publish")}
                  />
                  <label> Publish</label>
                </div>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    value="Draft"
                    checked={status === "Draft"}
                    onChange={() => handleToggle("Draft")}
                  />
                  <label>Draft</label>
                </div>
              </div>
            </div>
            <div className="flex gap-8 justify-end">
              <button
                className="bg-blue-500 text-white px-2 py-3 rounded"
                onClick={handleAddJob}
              >
                Post Job
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
