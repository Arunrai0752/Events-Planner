import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { useNavigate  } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";


const Navbar = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ 
      firstname: "My",
    });   


  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };
  
    useEffect(() =>  {
      fetchUserData(  );
    }, [navigate]);
  
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <div  className="flex-shrink-0 flex items-center">
            <img src="logo.png" alt=""  className="flex justify-between h-20 items-center " />
            <Link 
              to="/" 
              className="flex items-center space-x-2 transform hover:scale-105 transition duration-300"
            >
              <FaHeart className="text-3xl text-rose-600 animate-pulse" />
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800 font-serif">Two Souls</h1>
                <p className="text-sm text-gray-600 font-serif">One Promise</p>
              </div>
            </Link>
          </div>

        
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-8">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories" 
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  STORIES
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  SERVICES
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  GALLERY
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          <div className="ml-4 flex items-center md:ml-6">
            <button 
              onClick={() => navigate("/UserDashboard")}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-amber-400 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-1000"
            >
              <div className=" bg-[url(wednesday.jpg)] h-8 w-8 rounded-2xl bg-center bg-cover text-xl">

              </div>
              <span className="font-medium"> {userData.firstname }'s Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;