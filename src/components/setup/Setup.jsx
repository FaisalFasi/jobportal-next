"use client";
import React, { useEffect } from "react";
import { getMyProfile } from "@/services/Auth";
import { useRouter } from "next/navigation";

const Setup = () => {
  const router = useRouter();

  useEffect(() => {
    const asyncWrapper = async () => {
      const profile = await getMyProfile();
      const logged_in = profile.data?.session;

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
  }, []);

  return <div></div>;
};

export default Setup;
