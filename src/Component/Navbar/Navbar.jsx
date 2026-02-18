"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "../Button/AuthButton";

const Navbar = () => {
  const pathname = usePathname();
  const navLinkClass = (path) =>
    pathname === path ? "text-primary font-semibold" : "hover:text-primary";

  const links = (
    <>
      <li>
        <Link className={navLinkClass("/")} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={navLinkClass("/services")} href="/service">
          All Services
        </Link>
      </li>
      <li>
        <Link className={navLinkClass("/my-bookings")} href="/mybookings">
          My Bookings
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Service Care
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        <AuthButton></AuthButton>
      </div>
    </div>
  );
};

export default Navbar;
