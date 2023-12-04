"use client";
import React, { useEffect, useCallback, useState } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../GlobalRedux/Features/auth/AuthSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const { user } = useSelector((state) => state.auth);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = useCallback((email) => emailRegex.test(email), []);
  const isPasswordValid = useCallback(
    (password) => password && password.length >= 7,
    []
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isValidEmail(userEmail)) {
      alert("Please enter a valid email");
      return;
    }

    if (!isPasswordValid(password)) {
      alert("Password must be at least 7 characters");
      return;
    }
    try {
      const response = await dispatch(
        signUp({ email: userEmail, password, role })
      );
      const data = response.payload;

      // If data is received, show success message
      if (data) {
        toast.success("Please confirm your email to login");
        router.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred during sign-up. Please try again.");
    }
  };

  useEffect(() => {
    if (user?.aud === "authenticated") {
      router.push("/login");
    }
  }, [user]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-[550px] px-4 md:border mt-8 mx-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center"> Sign Up</h1>
        </div>
        <div className="mt-8">
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
            <div className="flex justify-center gap-8">
              <div className="flex justify-center gap-4">
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
              <div className="flex justify-center gap-4">
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
              <Button type="submit" text={"Sign Up"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
