"use client";
import React, { useEffect } from "react";
import { getAllMyConversations } from "@/services/Messages";
import FindPeople from "@/app/findpeople/page";

const Page = () => {
  // useEffect(() => {
  //   const getConversations = async () => {
  //     const { data, error } = await getAllMyConversations();
  //     console.log("res: ", data, error);
  //   };
  //   // getConversations();
  // }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8 ">
      <div className="">
        <h1 className="font-bold text-2xl"> Messages</h1>
      </div>
      <div className="flex items-center mt-8 bg-white shadow-md p-4 rounded-md">
        <div className="w-full flex  gap-4 items-center ">
          <div>sender icon</div>
          <div>
            <h2 className="font-semibold">Sender Name</h2>
            <p className="text-gray-400">Message here</p>
          </div>
        </div>
        <div>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
