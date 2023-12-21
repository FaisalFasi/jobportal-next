"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyProfile,
  updateProfile,
} from "../GlobalRedux/Features/profile/ProfileSlice";
import { createJob } from "../GlobalRedux/Features/jobs/JobsSlice";
import JobPostForm from "@/components/JobPostForm";
import "@/app/globals.css";
import ProfessionalLinks from "@/components/ProfessionalLinks";
import UpdateProfileForm from "@/components/UpdateProfileForm";

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

const Page = () => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state?.auth?.user?.user?.id);
  const getUserProfile = useSelector((state) => state?.profiles?.profiles[0]);

  const [isProfileEdited, setIsProfileEdited] = useState(false);
  const [postJobClicked, setPostJobClicked] = useState(false);

  const [updateUserData, setUpdateUserData] = useState({
    user_id: loggedInUserId,
    name: getUserProfile?.name || "",
    email: getUserProfile?.email || "",
    phone: getUserProfile?.phone || "",
    location: getUserProfile?.location || "",
    linkedin: getUserProfile?.linkedin || "",
    github: getUserProfile?.github || "",
    personal_website: getUserProfile?.personal_website || "",
  });

  useEffect(() => {
    setUpdateUserData({
      user_id: loggedInUserId,
      name: getUserProfile?.name || "",
      email: getUserProfile?.email || "",
      phone: getUserProfile?.phone || "",
      location: getUserProfile?.location || "",
      linkedin: getUserProfile?.linkedin || "",
      github: getUserProfile?.github || "",
      personal_website: getUserProfile?.personal_website || "",
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

  const handleEdit = (e) => {
    e.preventDefault();

    setIsProfileEdited(!isProfileEdited);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!loggedInUserId || !updateUserData) {
        console.error("loggedInUser or updateUserData is undefined.");
        return;
      }
      await dispatch(updateProfile(updateUserData));
      setIsProfileEdited(false);
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

  const handleAddPost = async (jobDetails) => {
    await dispatch(createJob(jobDetails));
  };

  const toggleJobModal = () => {
    setPostJobClicked((prevPostJobClicked) => !prevPostJobClicked);
  };

  return (
    <div>
      <div className=" h-full w-full md:w-2/3 flex justify-center items-center m-auto">
        <div className="profile-bg w-full m-4 p-4   flex flex-col items-center gap-10 rounded-md">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-xl">Profile</h1>
            <button
              onClick={handleEdit}
              className="font-bold hover:opacity-50 "
            >
              Edit
            </button>
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
              <div className="font-bold flex gap-4">
                <h3>
                  {updateUserData.name.trim() !== ""
                    ? updateUserData.name
                    : "please edit your info"}
                </h3>
              </div>
              <div className="">
                <p>{updateUserData.email}</p>
                <p>{updateUserData.phone}</p>
                <p>{updateUserData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-full w-full flex justify-center items-center">
        {getUserProfile?.role === "jobseeker" ? (
          <div className="profile-bg w-full md:w-1/2 h-1/2 m-4 p-4  flex flex-col items-start rounded-md">
            <div className=" h-full w-full flex justify-center items-center">
              {getUserProfile?.role === "jobseeker" ? (
                <div className=" w-full  h-1/2 m-4 p-4  flex flex-col items-start ">
                  <div>
                    <h1 className="text-xl font-semibold"> CV</h1>
                  </div>
                  <div className="w-full p-4 ">
                    <p>
                      This CV will by default be used for your future
                      applications. Of course, you will always have the option
                      to upload another CV during each application process.
                    </p>
                    <div className="flex gap-4 items-center p-4 mt-4 border-2 border-gray-200 shadow-lg  rounded-md ">
                      <div>icon</div>
                      <div className="w-full flex gap-4 justify-between">
                        <div>
                          <h2>CV</h2>
                          <p>name of uploaded cv i.e(Faisal_CV.pdf)</p>
                        </div>
                        <div className="flex flex-col">
                          <button>download</button>
                          <button>delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center p-2">
                  <button className=" w-1/3 rounded" onClick={toggleJobModal}>
                    Post a Job
                  </button>

                  {postJobClicked && (
                    <JobPostForm
                      onClose={toggleJobModal}
                      onAddJob={handleAddPost}
                      loggedInUserId={loggedInUserId}
                    />
                  )}
                </div>
              )}
            </div>{" "}
          </div>
        ) : (
          <div className="w-full text-center">
            <button
              className="profile-bg font-bold w-1/3 py-2 rounded-md"
              onClick={toggleJobModal}
            >
              Post a Job or Internship
            </button>

            {postJobClicked && (
              <JobPostForm
                onClose={toggleJobModal}
                onAddJob={handleAddPost}
                loggedInUserId={loggedInUserId}
              />
            )}
          </div>
        )}
      </div>
      <ProfessionalLinks
        handleInputChange={handleInputChange}
        professionalLinks={professionalLinks}
      />
      {isProfileEdited && (
        <UpdateProfileForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          updateUserData={updateUserData}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Page;
