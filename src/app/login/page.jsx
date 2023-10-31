import React from "react";
import Button from "../../components/Button/Button";

const Login = () => {
  return (
    <div className="w-full flex justify-center mb-40 ">
      <div className="w-full md:w-[550px] md:px-4 md:border mt-8 mx-4">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-center"> Log In</h1>
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
            <div className="pt-8">
              <Button text="Log In" />
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
