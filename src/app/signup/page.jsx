import React from "react";

import Button from "../../components/Button/Button";
const SignUp = () => {
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
            />
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="border w-full p-2"
            />
            <div className="py-8">
              <Button text="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
