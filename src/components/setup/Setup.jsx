"use client";
import React, { useEffect } from "react";
// import { getMyProfile } from "@/services/Auth";
import { useRouter } from "next/navigation";

import { fetchUserData } from "@/app/GlobalRedux/Features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "@/app/GlobalRedux/Features/profile/ProfileSlice";
const Setup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);

  useEffect(() => {
    const asyncWrapper = async () => {
      const session = await dispatch(fetchUserData());
      const logged_in = session?.payload?.access_token;

      const protected_urls = ["/dashboard", "/profile", "/messages"];
      const not_logged_in_urls = ["/login"];

      if (!logged_in && protected_urls.includes(window.location.pathname)) {
        router.push("/login");
      }

      if (logged_in && not_logged_in_urls.includes(window.location.pathname)) {
        router.push("/dashboard");
      }
    };
    asyncWrapper();
  }, [isAuthenticated]);

  return <div></div>;
};

export default Setup;
