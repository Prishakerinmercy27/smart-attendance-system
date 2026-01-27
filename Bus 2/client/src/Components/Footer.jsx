// Footer.js
import React from "react";
import { FaInfoCircle, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          <p>&copy; 2024 BusTracker Pro. All rights reserved.</p>
        </div>
        <ul className="flex space-x-4 text-sm">
          <li>
            <a href="/about" className="flex items-center hover:text-gray-400">
              <FaInfoCircle className="mr-1" /> About
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="flex items-center hover:text-gray-400">
              <FaShieldAlt className="mr-1" /> Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="flex items-center hover:text-gray-400">
              <FaShieldAlt className="mr-1" /> Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="flex items-center hover:text-gray-400">
              <FaPhoneAlt className="mr-1" /> Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
