// Navbar.js
import React from "react";
import { FaHome, FaMapMarkerAlt, FaInfoCircle, FaPhoneAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold flex items-center">
          <FaMapMarkerAlt className="mr-2 text-2xl" />
          BusTracker Pro
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="flex items-center hover:bg-blue-700 p-2 rounded">
              <FaHome className="mr-1" /> Home
            </a>
          </li>
          <li>
            <a href="/track-bus" className="flex items-center hover:bg-blue-700 p-2 rounded">
              <FaMapMarkerAlt className="mr-1" /> Track Bus
            </a>
          </li>
          <li>
            <a href="/routes" className="flex items-center hover:bg-blue-700 p-2 rounded">
              <FaInfoCircle className="mr-1" /> Routes
            </a>
          </li>
          <li>
            <a href="/contact" className="flex items-center hover:bg-blue-700 p-2 rounded">
              <FaPhoneAlt className="mr-1" /> Contact
            </a>
          </li>
          <li>
            <a href="/" className="flex items-center hover:bg-blue-700 p-2 rounded">
              <FaSignInAlt className="mr-1" /> Logout
            </a>
          </li>
       
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
