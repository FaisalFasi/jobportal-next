"use client";
import React from "react";
import Button from "../../components/Button/Button";
import { useState } from "react";

import { signInWithEmail } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/contexts/UserContext";
import { useContext } from "react";

const Login = () => {
  const router = useRouter();
  const { login } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("userEmail: ", userEmail);
    console.log("password: ", password);

    const res = await login(userEmail, password);
    console.log("res: ", res);
    if (res?.session) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full flex justify-center mb-40 ">
      <div className="w-full md:w-[550px] md:px-4 md:border mt-8 mx-4">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-center"> Log In</h1>
        </div>
        <div className="mt-8 ">
          <form
            onSubmit={(e) => onSubmitHandler(e)}
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
              className="border w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-8">
              <Button text="Login" />
            </div>
          </form>
        </div>
        <h1 className="text-xl font-bold my-8 text-center">Or</h1>
        <div className="flex flex-col gap-4 px-10">
          <Button text=" Log In with Google" />
          <Button text="Log In with Github" />
        </div>
        <div className="flex flex-col gap-8 my-8 text-center">
          <h2> Don't have an account?</h2>
          <Button url={"/signup"} text="Sign Up" />
        </div>
      </div>
    </div>
  );
};

export default Login;
