"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { signOut } from "@/services/Auth";
import { useRouter } from "next/navigation";

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
];

const Navbar = () => {
  const router = useRouter();
  const { user, session, logout } = useContext(UserContext);
  const [isNavbarMenuOpen, setIsnavbarMenuOpen] = useState(false);

  const openNavbarMenu = () => {
    setIsnavbarMenuOpen(!isNavbarMenuOpen);
  };

  const handleLogOut = async () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    setIsnavbarMenuOpen(false);
    console.log(isNavbarMenuOpen);
  }, []);
  return (
    <div>
      <div className="fixed w-full flex justify-between  items-center top-0 px-4 py-8 bg-blue-300 ">
        <div className="w-full flex justify-between items-center ">
          <div>
            <Link href={"/"}>FR-Work </Link>{" "}
          </div>
          {session && (
            <button
              className=" absolute top-0 right-0 px-4 pt-7 md:hidden z-[100] text-2xl"
              onClick={() => openNavbarMenu()}
            >
              {isNavbarMenuOpen ? "x" : "☰"}
            </button>
          )}
        </div>

        {session ? (
          <ul
            className={`absolute md:static w-screen md:w-full h-screen md:h-full bg-red-400 md:bg-blue-300 opacity-80  md:opacity-100 z-50 md:z-10 left-0 py-20 md:py-0  flex-col flex md:flex-row md:justify-end items-center gap-6 whitespace-nowrap  ${
              isNavbarMenuOpen ? "top-0" : "top-[-1000px]"
            }`}
          >
            {user.email}
            {navbarLinks.map((link) => {
              return (
                <li key={link.id}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              );
            })}
            <button onClick={handleLogOut}>Logout</button>
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
