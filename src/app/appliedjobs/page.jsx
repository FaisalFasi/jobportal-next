import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-8 ">
      <div className="pt-4">
        <h1> 1 applications submitted</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-start mt-8 bg-white shadow-md p-4 rounded-md">
        <div> company icon</div>
        <div className="w-full flex flex-col gap-4 ">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-lg">
                Internship Frontend Entwicklung (m/w/d) für SaaS Startu
              </h2>
              <p className="text-sm">Company Name</p>
            </div>
            <div className="flex flex-col gap-2 w-fit">
              <span className="text-sm bg-gray-200 rounded-xl  px-[2px] text-center   ">
                submitted
              </span>
              <span className="text-sm px-[4px] text-center ">
                Applied on 22-11-2021
              </span>
            </div>
          </div>
          <div className=" text-end">
            <button> open menu </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
