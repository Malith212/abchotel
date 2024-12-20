import React, { useState } from "react";
import logo from "../assets/image 21.png";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/user/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
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
      ></button>
      <button
        onClick={handleLogout}
        className="flex items-center text-white pr-4"
      >
        <IoLogOut className="text-lg mr-1" />
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
