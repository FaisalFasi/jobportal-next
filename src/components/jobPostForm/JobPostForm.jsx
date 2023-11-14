import React, { useEffect, useState } from "react";

const JobPostForm = ({ onClose, onAddJob, loggedInUserId }) => {
  const [jobDetails, setJobDetails] = useState({
    // id: "",
    title: "",
    description: "",
    recruiter_id: loggedInUserId.toString(),
    company_url: "",
    company_name: "",
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

    // Validate job details before adding
    // if (
    //   jobDetails.title &&
    //   jobDetails.description &&
    //   jobDetails.recruiterId &&
    //   jobDetails.companyUrl &&
    //   jobDetails.companyName &&
    //   jobDetails.salary &&
    //   jobDetails.location
    // ) {
    //   onAddJob(jobDetails);
    //   onClose();
    // } else {
    //   console.error("Please fill in all required fields.");
    // }
  };
  const handleWheel = (e) => {
    const isPopupContent = e.target.closest(".your-popup-content-class");
    e.stopPropagation();

    // If the wheel event occurred within the popup content, prevent further propagation
    if (isPopupContent) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    console.log("jobDetails: " + JSON.stringify(jobDetails));
  }, [onAddJob]);

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
            <div className=" w-full md:w-2/5 flex flex-col   items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Company Name:
              </label>
              <input
                type="text"
                name="companyName"
                value={jobDetails.company_name}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Recruiter ID:
              </label>
              <input
                type="text"
                name="recruiterId"
                value={jobDetails.recruiter_id}
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
                name="companyUrl"
                value={jobDetails.company_url}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Salary:
              </label>
              <input
                type="text"
                name="salary"
                value={jobDetails.salary}
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
            <div className=" w-full flex flex-col  items-start justify-start gap-4 p-6 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Job Description:
              </label>
              <textarea
                name="description"
                value={jobDetails.description}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              ></textarea>
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

{
  /* <div className="fixed top-0 w-full h-full bg-black bg-opacity-50 text-white">
      <div className="bg-gray-300 text-black m-8 overflow-scroll rounded-md p-8   ">
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
            <div className=" w-full md:w-2/5 flex flex-col   items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Company Name:
              </label>
              <input
                type="text"
                name="companyName"
                value={jobDetails.companyName}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Recruiter ID:
              </label>
              <input
                type="text"
                name="recruiterId"
                value={jobDetails.recruiterId}
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
                name="companyUrl"
                value={jobDetails.companyUrl}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              />
            </div>

            <div className=" w-full md:w-2/5 flex flex-col  items-start justify-start gap-4 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Salary:
              </label>
              <input
                type="text"
                name="salary"
                value={jobDetails.salary}
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
            <div className=" w-full flex flex-col  items-start justify-start gap-4 p-6 ">
              <label className=" text-gray-700 text-sm font-bold ">
                Job Description:
              </label>
              <textarea
                name="description"
                value={jobDetails.description}
                onChange={handleInputChange}
                className=" w-full border p-2 rounded border-gray-600"
              ></textarea>
            </div>
            <div className="flex gap-8 justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
    </div> */
}
