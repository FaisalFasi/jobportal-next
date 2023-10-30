"use client";
import Link from "next/link";
import React, { useState } from "react";

const navbarLinks = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Applied Jobs",
    url: "/appliedjobs",
  },

  {
    id: 3,
    title: "Profile",
    url: "/profile",
  },

  {
    id: 4,
    title: "Messages",
    url: "/messages",
  },
  {
    id: 5,
    title: "Setting",
    url: "/setting",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 7,
    title: "Logout",
    url: "/logout",
  },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isNavbarMenuOpen, setIsnavbarMenuOpen] = useState(false);

  const openNavbarMenu = () => {
    setIsnavbarMenuOpen(!isNavbarMenuOpen);
    console.log(isNavbarMenuOpen);
  };
  const closeNavbarMenu = () => {
    setIsnavbarMenuOpen(false);
  };

  return (
    <div>
      <div className="fixed w-full flex justify-between  items-center top-0 px-10 py-8 bg-blue-300 ">
        <div className="w-full flex justify-between ">
          <div>FR-Work</div>
          {isLoggedIn && (
            <button
              className=" absolute top-0 right-0 px-10 py-8 md:hidden z-[100]"
              onClick={openNavbarMenu}
            >
              Humburger
            </button>
          )}
        </div>

        {isLoggedIn ? (
          <ul
            className={`absolute md:static w-screen md:w-full h-screen md:h-full bg-red-400 md:bg-blue-300 opacity-80  md:opacity-100 z-50 md:z-10 left-0 py-20 md:py-0  flex-col flex md:flex-row md:justify-center items-center gap-6 whitespace-nowrap  ${
              isNavbarMenuOpen ? "top-0" : "top-[-600px]"
            }`}
          >
            {navbarLinks.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex justify-end gap-8 w-full">
            <button>Login</button>
            <button>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
