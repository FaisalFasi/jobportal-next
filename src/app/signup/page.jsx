"use client";
import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../GlobalRedux/Features/auth/AuthSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useState } from "react";
const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const { user } = useSelector((state) => state.auth);

  // const notify = (text) => toast(text);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await dispatch(
        signUp({ email: userEmail, password, role })
      );

      // If data is received, show success message
      if (data) {
        console.log("data: ", data);
        toast.success("Please confirm your email");
      }
    } catch (error) {
      // If there's an error, show an error message
      console.error("Error during sign-up:", error);
      toast.error("An error occurred during sign-up. Please try again.");
    }
  };

  useEffect(() => {
    console.log("user: ", user);
    if (user?.aud === "authenticated") {
      router.push("/login");
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("role: ", role);
  // }, [role]);

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full md:w-[550px] px-4 md:border mt-8 mx-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center"> Sign Up</h1>
        </div>
        <div className="mt-8 ">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col gap-4 justify-center items-center w-full"
          >
            <label htmlFor="email" className="w-full">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border w-full p-2"
              placeholder="Email"
              autoComplete="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-2"
            />
            {/* radio group for role (jobseeker/recruiter) */}

            <div className="flex  justify-center gap-8">
              <div className=" flex justify-center gap-4">
                <label htmlFor="jobseeker">Job Seeker</label>
                <input
                  type="radio"
                  id="jobseeker"
                  name="role"
                  value="jobseeker"
                  checked={role === "jobseeker"}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className=" flex justify-center gap-4">
                <label htmlFor="recruiter">Recruiter</label>
                <input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={role === "recruiter"}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="py-8">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
