"use client";
import React, { useEffect } from "react";
import { getAllMyConversations } from "@/services/Messages";

const page = () => {
  useEffect(() => {
    const getConversations = async () => {
      const res = await getAllMyConversations();
      console.log("res: ", res);
    };
    getConversations();
  }, []);
  return (
    <div className="px-8">
      <h1>Messages</h1>

      <div>aökljbcas</div>
    </div>
  );
};

export default page;
