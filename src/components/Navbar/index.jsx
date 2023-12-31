"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut as logout } from "@/app/GlobalRedux/Features/auth/AuthSlice";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navbarLinks = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Profile",
    url: "/profile",
  },
  {
    id: 3,
    title: "Find People",
    url: "/findpeople",
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
];

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useRouter();
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const user = useSelector((state) => state?.auth?.user);

  const [isNavbarMenuOpen, setIsnavbarMenuOpen] = useState(false);
  const openNavbarMenu = () => {
    setIsnavbarMenuOpen(!isNavbarMenuOpen);
  };

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate.push("/login");
  };
  const handleRedirect = () => {
    if (!isAuthenticated) {
      navigate.push("/");
    } else {
      navigate.push("/dashboard");
    }
  };

  useEffect(() => {
    setIsnavbarMenuOpen(false);
  }, []);

  return (
    <div>
      <div className="fixed w-full flex justify-between  items-center top-0 px-4 py-8 navbar-bg font-bold text-md ">
        <div className="w-full flex justify-between items-center ">
          <div>
            <button onClick={handleRedirect}>FR-Portal </button>
          </div>
          {isAuthenticated && (
            <button
              className=" absolute top-0 right-0 px-4 pt-7 md:hidden z-[100] text-2xl hover:opacity-50"
              onClick={() => openNavbarMenu()}
            >
              {isNavbarMenuOpen ? "x" : "☰"}
            </button>
          )}
        </div>

        {isAuthenticated ? (
          <ul
            className={`absolute md:static w-screen md:w-full h-screen md:h-full navbar-bg  opacity-90 md:opacity-100 z-50 md:z-10 left-0 py-20 md:py-0  flex-col flex md:flex-row md:justify-end items-center gap-6 whitespace-nowrap  transition-all duration-300 transform text-xl md:text-base ${
              isNavbarMenuOpen ? "top-0" : "top-[-1000px]"
            }  `}
          >
            {user.email}
            {navbarLinks.map((link) => {
              return (
                <li
                  key={link.id}
                  className={`hover:text-blue-300 `}
                  onClick={() => setIsnavbarMenuOpen(false)}
                >
                  <Link href={link.url}>
                    {navigate.pathname} {link.title}
                  </Link>
                </li>
              );
            })}
            <button className=" hover:text-red-500" onClick={handleLogOut}>
              Logout
            </button>
          </ul>
        ) : (
          <div className="flex justify-end gap-8 w-full">
            <button>
              <Link href={"/login"}>Log In</Link>{" "}
            </button>
            <button>
              <Link href={"/signup"}>Sign Up</Link>
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
