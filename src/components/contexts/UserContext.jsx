"use client";
import React, { createContext, useEffect, useState } from "react";

import {
  getMyProfile,
  loginWithEmail,
  registerJobSeeker,
  registerRecruiter,
  signOut,
} from "@/services/Auth";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await loginWithEmail(email, password);
      console.log("data: ", data);
      setSession(data?.data?.session);
      setProfile(data?.data?.profile);
      setUser(data?.data?.session?.user);
      return data;
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const register = async () => {
    const data = await registerJobSeeker();
    setSession(data?.data?.session);
    setProfile(data?.data?.profile);
    setUser(data?.data?.session?.user);
  };
  const logout = async () => {
    await signOut();
    setSession(null);
    setProfile(null);
    setUser(null);
  };

  const getUserInfos = () => {
    return getMyProfile().then((profile) => {
      setSession(profile?.data?.session);
      setUser(profile?.data?.session?.user);
      setProfile(profile?.data?.profile);
    });
  };

  useEffect(() => {
    getUserInfos();
  }, [session]);

  //   useEffect(() => {
  //     const session = JSON.parse(localStorage.getItem("supabase.auth.token"));
  //     if (session) {
  //       setSession(session.currentSession);
  //       setUser(session.currentSession.user);
  //       getMyProfile()
  //         .then((profileData) => setProfile(profileData?.data?.profile))
  //         .catch((error) => console.error("Error fetching profile:", error));
  //     }
  //   }, []);

  return (
    <UserContext.Provider
      value={{ login, logout, register, session, profile, user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
