"use client";
import React, { useState, useCallback } from "react";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmailPassword } from "../GlobalRedux/Features/auth/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = useCallback((email) => emailRegex.test(email), []);
  const isPasswordValid = useCallback(
    (password) => password && password.length >= 7,
    []
  );

  const validateEmail = () => {
    if (!isValidEmail(userEmail)) {
      toast("Please enter a valid email");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!isPasswordValid(password)) {
      toast("Password must be at least 7 characters");
      return false;
    }
    return true;
  };

  const handleSignUpError = (error) => {
    toast.error("An unexpected error occurred during login:", error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    try {
      const { data, error } = await dispatch(
        loginWithEmailPassword({ email: userEmail, password: password })
      );

      if (error) {
        toast.error("Error during login", error);
        return;
      }

      if (data) {
        toast.success("Logged in successfully");
      }
    } catch (error) {
      handleSignUpError(error);
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
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <h1 className="text-xl font-bold my-8 text-center">Or</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-10">
          <Button text=" Log In with Google" />
          <Button text="Log In with Github" />
        </div>
        <div className="flex flex-col items-center justify-center gap-8 my-8  ">
          <h2> {`Don't have an account?`}</h2>
          <Button
            onClick={() => {
              router.push("/signup");
            }}
            text="Sign Up"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import Button from "../../components/Button/Button";
// import { useRouter } from "next/navigation";

// import { useDispatch, useSelector } from "react-redux";
// import { loginWithEmailPassword } from "../GlobalRedux/Features/auth/AuthSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // import Test from "@/components/Test";
// const Login = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { loading, error } = useSelector((state) => state.auth);

//   const [userEmail, setUserEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const isValidEmail = useCallback((email) => emailRegex.test(email), []);
//   const isPasswordValid = useCallback(
//     (password) => password && password.length >= 7,
//     []
//   );

//   const handleSignUpError = () => {
//     toast.error(
//       "An unexpected error occurred during sign-up. Please check your email / password and try again"
//     );
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!isValidEmail(userEmail)) {
//       toast("Please enter a valid email");
//       return;
//     }

//     if (!isPasswordValid(password)) {
//       toast("Password must be at least 7 characters");
//       return;
//     }

//     try {
//       const { data, error } = await dispatch(
//         loginWithEmailPassword({ email: userEmail, password: password })
//       );

//       if (error) {
//         // Handle the error as needed, e.g., display a toast
//         toast.error("Error during login", error);
//         // console.error("Error during login:", error);
//         return;
//       }

//       if (data) {
//         // Handle the success case
//         toast.success("Logged in successfully");
//         // console.log("userEmail: ", userEmail);
//       }
//     } catch (error) {
//       toast.error("Unexpected error during login:", error);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center mb-40 ">
//       <div className="w-full md:w-[550px] md:px-4 md:border mt-8 mx-4">
//         <div className="py-4">
//           <h1 className="text-3xl font-bold text-center"> Log In</h1>
//         </div>

//         <div className="mt-8 ">
//           <form
//             onSubmit={(e) => handleLogin(e)}
//             className="flex flex-col gap-4 justify-center items-center w-full"
//           >
//             <label htmlFor="email" className="w-full">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="border w-full p-2"
//               placeholder="Email"
//               autoComplete="email"
//               value={userEmail}
//               onChange={(e) => setUserEmail(e.target.value)}
//             />
//             <label htmlFor="password" className="w-full">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               autoComplete="password"
//               className="border w-full p-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className="pt-8">
//               <Button text="Login" />
//             </div>
//           </form>
//           {loading ? "Logging in..." : " "}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//         <h1 className="text-xl font-bold my-8 text-center">Or</h1>
//         <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-10">
//           <Button text=" Log In with Google" />
//           <Button text="Log In with Github" />
//         </div>
//         <div className="flex flex-col items-center justify-center gap-8 my-8  ">
//           <h2> {`Don't have an account?`}</h2>
//           <Button
//             onClick={() => {
//               router.push("/signup");
//             }}
//             // url={"/signup"}
//             text="Sign Up"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
