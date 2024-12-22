import React, { useState } from "react";
import logo from "../assets/image 21.png";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon
import { useNavigate } from "react-router-dom"; // Import useNavigate
// ...existing code...

const Navbar2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Define navigate

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCartClick = () => {
    navigate("/shopping");
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

      {/* Cart Icon */}
      <div className="flex items-center pr-4">
        <FaShoppingCart className="text-white w-6 h-6 cursor-pointer" onClick={handleCartClick} />
      </div>
    </nav>
  );
};

export default Navbar2;
