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
        // Wait for the fetchUserData action to complete
        await dispatch(fetchUserData());

        const logged_in = isAuthenticated;

        // const protected_urls = ["/dashboard", "/profile", "/messages"];

        // const protected_urls = ["/dashboard"];
        const not_logged_in_urls = ["/", "/login", "/signup"];

        if (!logged_in && not_logged_in_urls.includes(router.pathname)) {
          router.push("/");
        }

        if (logged_in && not_logged_in_urls.includes(router.pathname)) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    asyncWrapper();
  }, [isAuthenticated, router]);

  return <div></div>;
};

export default Setup;
