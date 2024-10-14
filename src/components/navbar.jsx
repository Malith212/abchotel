import React, { useState } from "react";
import logo from "../assets/image 21.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-amber-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3"> {/* Home Page */}
          <img src={logo} className="h-10 w-10" alt="logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            ABC Hotel
          </span>
        </a>

        {/* Hamburger button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          {menuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          )}
        </button>

        {/* Menu links */}
        <div
          className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  text-white">
            <li>
              <a href="/" className="block py-2 px-3 hover:underline md:p-0"> {/* Home Page */}
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="block py-2 px-3 hover:underline md:p-0"> {/* Services Page */}
                Services
              </a>
            </li>
            <li>
              <a href="/about" className="block py-2 px-3 hover:underline md:p-0"> {/* About Us Page */}
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="block py-2 px-3 hover:underline md:p-0"> {/* Contact Us Page */}
                Contact Us
              </a>
            </li>
            <li>
              <a href="/careers" className="block py-2 px-3 hover:underline md:p-0"> {/* Careers Page */}
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;