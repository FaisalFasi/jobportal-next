"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signOut as logout } from "@/app/GlobalRedux/Features/auth/AuthSlice";
const navbarLinks = [
  // {
  //   id: 1,
  //   title: "Home",
  //   url: "/",
  // },
  // {
  //   id: 1,
  //   title: "Applied Jobs",
  //   url: "/appliedjobs",
  // },
  {
    id: 1,
    title: "Find People",
    url: "/findpeople",
  },
  {
    id: 2,
    title: "Profile",
    url: "/profile",
  },

  {
    id: 3,
    title: "Messages",
    url: "/messages",
  },
  {
    id: 4,
    title: "Setting",
    url: "/setting",
  },
  {
    id: 5,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const user = useSelector((state) => state?.auth?.user);

  const [isNavbarMenuOpen, setIsnavbarMenuOpen] = useState(false);

  // const error = useSelector((state) => state?.auth?.error);

  const openNavbarMenu = () => {
    setIsnavbarMenuOpen(!isNavbarMenuOpen);
  };

  const handleLogOut = async () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   const asyncWrapper = async () => {
  //     if (!user?.id) return;
  //     const userProfile = await dispatch(fetchMyProfile(user?.id));
  //     console.log("userProfile", userProfile);
  //   };
  //   asyncWrapper();
  // }, [user]);

  useEffect(() => {
    setIsnavbarMenuOpen(false);
    // console.log("Navbar: " + isNavbarMenuOpen);
  }, []);

  return (
    <div>
      {/* Hey, welcome back {profile.username}! */}
      <div className="fixed w-full flex justify-between  items-center top-0 px-4 py-8 bg-blue-500 text-white font-bold text-md ">
        <div className="w-full flex justify-between items-center ">
          <div>
            {/* <Link href={"/"}>FR-Portal </Link>{" "} */}
            <h1>FR-Portal </h1>
          </div>
          {isAuthenticated && (
            <button
              className=" absolute top-0 right-0 px-4 pt-7 md:hidden z-[100] text-2xl"
              onClick={() => openNavbarMenu()}
            >
              {isNavbarMenuOpen ? "x" : "☰"}
            </button>
          )}
        </div>

        {isAuthenticated ? (
          <ul
            className={`absolute md:static w-screen md:w-full h-screen md:h-full bg-blue-500 md:bg-blue-500 opacity-90 text-white  md:opacity-100 z-50 md:z-10 left-0 py-20 md:py-0  flex-col flex md:flex-row md:justify-end items-center gap-6 whitespace-nowrap  transition-all duration-300 transform  ${
              isNavbarMenuOpen ? "top-0" : "top-[-1000px]"
            }  `}
          >
            {user.email}
            {navbarLinks.map((link) => {
              return (
                <li
                  key={link.id}
                  className="hover:text-green-500"
                  onClick={() => setIsnavbarMenuOpen(false)}
                >
                  <Link href={link.url}>{link.title}</Link>
                </li>
              );
            })}
            <button className="  hover:text-green-500" onClick={handleLogOut}>
              Logout
            </button>
          </ul>
        ) : (
          <div className="flex justify-end gap-8 w-full">
            <button>
              <Link href={"/login"}>Log In</Link>{" "}
            </button>
            <button>
              <Link href={"/signup"}>Sign Up</Link>{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
