"use client";
import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { loginWithEmailPassword } from "../GlobalRedux/Features/auth/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        loginWithEmailPassword({ email: userEmail, password: password })
      );
    } catch (error) {
      console.log("error: ", error.message);
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
            onSubmit={(e) => handleLogin(e)}
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
          {loading ? "Logging in..." : " "}

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <h1 className="text-xl font-bold my-8 text-center">Or</h1>
        <div className="flex flex-col gap-4 px-10">
          <Button text=" Log In with Google" />
          <Button text="Log In with Github" />
        </div>
        <div className="flex flex-col gap-8 my-8 text-center">
          <h2> Don't have an account?</h2>
          <Button
            onClick={() => console.log("Apply")}
            url={"/signup"}
            text="Sign Up"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
