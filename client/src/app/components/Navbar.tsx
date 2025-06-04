'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <Image 
          src="/NNLogo.png" 
          alt="NicoNet" 
          width={40} 
          height={40}
          className="object-contain"
        />
      </div>

      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
        className="md:hidden block focus:outline-none"
        type="button"
      >
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      <div
        className={
          `md:flex md:items-center md:w-auto w-full` +
          (menuOpen ? " block" : " hidden md:block")
        }
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li className="border-r">
              <Link className="md:p-4 py-3 px-0 block" href="/about">
                About
              </Link>
            </li>
            <li className="border-r">
              <Link className="md:p-4 py-3 px-0 block" href="/portfolio">
                Portfolio
              </Link>
            </li>
            <li className="border-r">
              <Link className="md:p-4 py-3 px-0 block" href="/services">
                Services
              </Link>
            </li>
            <li className="border-r">
              <Link className="md:p-4 py-3 px-0 block md:mb-0 mb-2" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
