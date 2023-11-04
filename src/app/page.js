"use client";
import { registerJobSeeker } from "../services/Auth";
import { useState } from "react";
export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main>
      <div className="w-full h-full flex flex-col py-10">
        <div>
          <div>
            <h1 className="text-center font-bold text-2xl">
              Welcome to FR-JOB PORTAL
            </h1>
          </div>
          <div>
            <h1 className="text-center font-bold text-2xl"> Jobs</h1>
          </div>
        </div>
      </div>
    </main>
  );
}

//   <input
// type="text"
// placeholder="email"
// name="email"
// //on focus email auto fill
// autoComplete="email"
// value={userEmail}
// onChange={(e) => setUserEmail(e.target.value)}
// />
// <input
// type="password"
// placeholder="password"
// value={password}
// onChange={(e) => setPassword(e.target.value)}
// />
// <button onClick={() => registerJobSeeker(userEmail, password)}>
// signup
// </button>
