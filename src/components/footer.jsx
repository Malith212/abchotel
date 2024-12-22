import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-white">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap justify-between items-center space-y-4">
        {/* Footer links */}
        {/* <div className="flex flex-wrap justify-center md:justify-start space-x-6">
          <Link to ="/" className="hover:underline">Home</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to ="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div> */}

        {/* Social media icons */}
        {/* <div className="flex justify-center space-x-6 w-full">
          <Link to="#" aria-label="Facebook" className="hover:underline">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="#" aria-label="Twitter" className="hover:underline">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#" aria-label="Instagram" className="hover:underline">
            <i className="fab fa-instagram"></i>
          </Link>
        </div> */}

        {/* Copyright */}
        <div className="w-full text-center">
        <p className="text-sm ">
          &copy; {new Date().getFullYear()} ABC Hotel. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
