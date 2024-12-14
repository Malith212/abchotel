import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-white">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Footer links */}
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <a href="/" className="hover:underline">Home</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
        </div>

        {/* Social media icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:underline">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:underline">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:underline">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ABC Hotel. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
