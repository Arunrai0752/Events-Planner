import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/CustomerDashboard");
  };


  return (
    <nav className="bg-gradient-to-tl from-rose-200 to-pink-300 shadow-lg w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <img src="logo.png" alt="" className="flex justify-between h-20 items-center" />
            <Link
              to="/"
              className="flex items-center space-x-2 transform hover:scale-105 transition duration-300"
            >
              <FaHeart className="text-3xl text-rose-600 animate-pulse" />
              <div className="text-center">
                <h1 className="text-xl font-bold text-rose-800 font-serif">Two Souls</h1>
                <p className="text-sm text-rose-700 font-serif">One Promise</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-8">
              <li>
                <Link
                  to="/about"
                  className="text-rose-800  hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 decoration-rose-500"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className="text-rose-800  hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300  decoration-rose-500"
                >
                  LOVE STORIES
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-rose-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 decoration-rose-500"
                >
                  OUR SERVICES
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-rose-800  px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:text-blue-600 decoration-rose-500"
                >
                  MEMORIES
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-rose-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300  decoration-rose-500"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>

          <div className="ml-4 flex items-center md:ml-6">
           
              {isLogin ? (
                <button
              onClick={handleClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-1000 hover:bg-rose-700"
            >
                  <img
                    src={user.photo}
                    alt="User Dp"
                    className="h-10 w-10 border rounded-full object-cover"
                  />
                  <span className="text-white">{user.firstname}, {user.lastname}</span>
                 </button>
              ) : (
                <button
                  className="border p-3 rounded-md text-white"
                  onClick={() => navigate("/login")}
                >
                
                  Login
                </button>
              )}
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;