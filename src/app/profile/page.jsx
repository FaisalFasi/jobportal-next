"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyProfile,
  updateProfile, // <<< TODO make this function
} from "../GlobalRedux/Features/profile/ProfileSlice";

const professionalLinks = [
  {
    name: "linkedIn",
    link: "https://www.linkedin.com/in/faisalrehman18/",
  },
  {
    name: "github",
    link: "empty",
  },
  {
    name: "personal website",
    link: "empty",
  },
];

const page = () => {
  const dispatch = useDispatch();

  const loggedInUserId = useSelector((state) => state?.auth?.user?.user?.id);

  const getUserProfile = useSelector((state) => state?.profiles?.profiles[0]);

  const [isProfileEditted, setIsProfileEditted] = useState(false);
  console.log("getUserProfile: ", getUserProfile?.role);

  const [updateUserData, setUpdateUserData] = useState({
    user_id: loggedInUserId,
    name: getUserProfile?.name || "",
    email: getUserProfile?.email || "",
    phone: getUserProfile?.phone || "",
    location: getUserProfile?.location || "",
  });

  useEffect(() => {
    setUpdateUserData({
      user_id: loggedInUserId,
      name: getUserProfile?.name || "",
      email: getUserProfile?.email || "",
      phone: getUserProfile?.phone || "",
      location: getUserProfile?.location || "",
    });
  }, [loggedInUserId, getUserProfile]);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        if (!loggedInUserId) return;
        await dispatch(fetchMyProfile(loggedInUserId));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    asyncWrapper();
  }, [dispatch, loggedInUserId]);

  const handleEdit = () => {
    setIsProfileEditted(!isProfileEditted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUserId || !updateUserData) {
        console.error("loggedInUser or updateUserData is undefined.");
        return;
      }
      await dispatch(updateProfile(updateUserData));

      setIsProfileEditted(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className="h-full w-full md:w-2/3 flex justify-center items-center m-auto">
        <div className=" w-full m-4 p-4 bg-gray-300 flex flex-col items-center gap-10">
          <div className="w-full flex justify-between ">
            <h1 className="font-bold text-xl">Profile</h1>
            <button onClick={handleEdit}>Edit</button>
          </div>
          <div className="flex w-full items-start gap-20">
            <div className="flex flex-col gap-8 items-center">
              <Image
                src="/myImage.png"
                alt="profile picture"
                priority
                width={100}
                height={100}
                className="w-auto rounded-full"
              />
              <h1 className="font-bold">Upload</h1>
            </div>
            <div>
              <h3 className="font-bold">{updateUserData?.name}</h3>
              <div className="">
                <p>{updateUserData.email}</p>
                <p>{updateUserData.phone}</p>
                <p>{updateUserData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full  flex justify-center items-center">
        {getUserProfile?.role === "jobseeker" ? (
          <div className="w-full md:w-1/2 h-1/2 m-4 p-4 bg-gray-300 flex flex-col items-start ">
            <div>
              <h1 className="text-xl font-semibold"> CV</h1>
            </div>
            <div className="w-full p-4 ">
              <p>
                This CV will by default be used for your future applications. Of
                course, you will always have the option to upload another CV
                during each application process.
              </p>
              <div className="flex gap-4 items-center p-4 mt-4 border-2 border-gray-200 shadow-lg  rounded-md ">
                <div>icon</div>
                <div className="w-full flex justify-between">
                  <div>
                    <h2>CV</h2>
                    <p>name of uploaded cv i.e(Faisal_CV.pdf)</p>
                  </div>
                  <div className="flex flex-col">
                    <button>watch</button>
                    <button>delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>recruiter profile</div>
        )}
      </div>

      <div className="h-full w-full flex justify-center items-center">
        <div className="w-full md:w-1/2 h-1/2 m-4 p-4 bg-gray-300 flex flex-col items-start gap-10">
          <div className="w-full flex justify-between">
            <h1 className="font-semibold text-xl">Professional Links</h1>
            <button> edit</button>
          </div>
          <div>
            {professionalLinks.map((link, idx) => {
              return (
                <div key={idx} className="pb-4">
                  <h2 className=" text-gray-500">{link.name} </h2>
                  <a href={link.link}>
                    <p>{link.link}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isProfileEditted && (
        <div className="w-screen  h-screen fixed top-0 flex items-center justify-center bg-black z-50 bg-opacity-50  m-auto">
          <div className=" w-full md:w-1/2  bg-gray-100 rounded-md m-6 md:m-20 p-4 md:p-8   ">
            <h1 className="text-2xl font-bold mb-4">User Profile Update</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={updateUserData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={updateUserData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={updateUserData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="location"
                  value={updateUserData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Update Profile
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={handleEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
