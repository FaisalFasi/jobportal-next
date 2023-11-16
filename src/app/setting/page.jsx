import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100  md:p-4">
      <div className="px-6 md:px-0 pt-8">
        <h1 className="font-bold text-2xl"> Account</h1>
      </div>
      <div className="mt-8 bg-white shadow-md p-4 rounded-md">
        <div className="w-full flex justify-between ">
          <h2>Job Alerts</h2>
          <p className="text-blue-800">+ Add job alert</p>
        </div>
        <div className="flex justify-between items-center  mt-4  shadow-md p-4 rounded-md border-2 border-gray-200">
          <div className="flex flex-col">
            <h1>Job title</h1>
            <p>location</p>
          </div>
          <div className="flex  gap-6">
            <h1>edit</h1>
            <p>delete</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-md p-4 rounded-md">
        <div className="">
          <h2 className="font-bold text-lg"> Important Links</h2>
          <ul className="pt-2 pb-8">
            <li>
              <a href="" className=" text-sm  text-blue-600">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="" className="  text-sm   text-blue-600">
                Data Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="pt-8">
          <p>
            {`If you don't agree with the terms,`}
            <a href="" className="text-blue-800">
              delete your account.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page; // <div className="w-full flex flex-col gap-4 ">
//         <div className="flex flex-col md:flex-row gap-4 justify-between">
//           <div>
//             <h2 className="font-semibold text-lg">
//               Internship Frontend Entwicklung (m/w/d) für SaaS Startu
//             </h2>
//             <p className="text-sm">Company Name</p>
//           </div>
//           <div className="flex flex-col gap-2 w-fit">
//             <span className="text-sm bg-gray-200 rounded-xl  px-[2px] text-center">
//               submitted
//             </span>
//             <span className="text-sm px-[4px] text-center ">
//               Applied on 22-11-2021
//             </span>
//           </div>
//         </div>
//         <div className=" text-end">
//           <button> open menu </button>
//         </div>
//       </div>
