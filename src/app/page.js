"use client";
import { registerJobSeeker } from "../services/Auth";
import { useState } from "react";
export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>FR JOB PORTAL </h1>
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
