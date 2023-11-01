"use client";
import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import { registerJobSeeker } from "@/services/Auth";
import { UserContext } from "@/components/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { useState } from "react";
const SignUp = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, session } = useContext(UserContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("userEmail: ", userEmail);
    console.log("password: ", password);

    const res = await register(userEmail, password);
    console.log("res: ", res);
    if (res?.session) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const SignUp = async () => {
      if (session) {
        router.push("/dashboard");
      }
    };
    SignUp();
  }, [session]);

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full md:w-[550px] px-4 md:border mt-8 mx-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center"> Sign Up</h1>
        </div>
        <div className="mt-8 ">
          <form className="flex flex-col gap-4 justify-center items-center w-full">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-2"
            />
            <div className="py-8">
              <button
                onClick={() => {
                  registerJobSeeker(userEmail, password);
                }}
              >
                Login
              </button>
              {/* <Button text="Sign Up" /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
