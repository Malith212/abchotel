import React, { useState } from "react";
import logo from "../assets/image 21.png";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="fixed top-6 left-0 right-0 bg-amber-950 rounded-full mx-6 md:mx-6 flex items-center justify-between p-2">
      {/* Centered Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 bg-white rounded-full p-2 shadow-md">
        <img src={logo} className="h-16 w-16 object-contain" alt="logo" />
      </div>

      {/* Left Section */}
      <div className="flex-1 pl-4">
        <span className="text-white text-xl font-bold">ABC Hotel</span>
      </div>

      {/* Hamburger button for Mobile */}
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden"
      >
        <span className="sr-only">Open main menu</span>
        {menuOpen ? (
          <svg
            className="w-6 h-6"
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
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        )}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block md:flex md:items-center md:space-x-6 mr-4`}
      >
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-white">
          {/* <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/services" className="hover:underline">
              Services
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </li> */}
          <li>
            <button onClick={handleLogout} className="flex items-center">
              <IoLogOut className="text-lg mr-1" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
