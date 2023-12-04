"use client";
// Import necessary dependencies
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/app/GlobalRedux/Features/auth/AuthSlice";
const Setup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        await dispatch(fetchUserData());
        console.log("isAuthenticated", isAuthenticated);

        const protected_urls = [
          "/profile",
          "/findpeople",
          "/messages",
          "/setting",
          "/dashboard",
        ];
        const not_logged_in_urls = ["/", "/login", "/signup"];

        if (isAuthenticated) {
          const isProtectedPath = protected_urls.some(
            (path) => window.location.pathname === path
          );

          if (isProtectedPath) {
            router.push(window.location.pathname);
          } else {
            router.push("/dashboard");
          }
        } else {
          const isNotLoggedInPath = not_logged_in_urls.some(
            (path) => window.location.pathname === path
          );
          if (isNotLoggedInPath) {
            router.push(window.location.pathname);
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    asyncWrapper();
  }, [dispatch, isAuthenticated]);

  return <div></div>;
};

export default Setup;
