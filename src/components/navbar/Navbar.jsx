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
];

const Navbar = () => {
  const [isNavbarOpen, setIsnavbarOpen] = useState(false);

  return (
    <div className="fixed w-full h-20 bg-blue-300  ">
      <div className="flex justify-between items-center h-full mx-16">
        <div>FR-Work</div>
        {isNavbarOpen ? (
          <div className="flex gap-2 ">
            {navbarLinks.map((link) => {
              return (
                <Link key={link.id} href={link.url}>
                  {link.title}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-8">
            <button>Login</button>
            <button>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
