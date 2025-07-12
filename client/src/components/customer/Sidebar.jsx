import React from "react";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiHelpCircle,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";
import { FaAirbnb } from "react-icons/fa";

const Sidebar = ({ active, setActive }) => {
  return (
    <div className="h-[90.7vh] w-[25vw] p-10  flex flex-col justify-between bg-gradient-to-bl from-red-200 to-pink-300 fixed ">
      <div>
        <div className="text-3xl border-b-2 p-5 text-center flex items-center justify-center gap-2">
          <span>User Dashboard</span>
        </div>
        <div className="p-10">
          <ul className="grid gap-4 ">
            <li
              className={`text-2xl  p-5  bg-blue-200 rounded-lg flex items-center gap-3 hover:bg-blue-500 cursor-pointer hover:text-white ${
                active === "profile" && "bg-green-500 text-white"
              }`}
              onClick={() => setActive("profile")}
            >
              <FiUser className="text-2xl" />
              <span>Profile</span>
            </li>
            <li
              className={`text-2xl  p-5  bg-blue-200 rounded-lg flex items-center gap-3 hover:bg-blue-500 cursor-pointer hover:text-white ${
                active === "overview" && "bg-green-500 text-white"
              }`}
              onClick={() => setActive("overview")}
            >
              <FiHome className="text-2xl" />
              <span>Overview</span>
            </li>
            <li
              className={`text-2xl  p-5  bg-blue-200 rounded-lg flex items-center gap-3 hover:bg-blue-500 cursor-pointer hover:text-white ${
                active === "booking" && "bg-green-500 text-white"
              }`}
              onClick={() => setActive("booking")}
            >
              <FiCalendar className="text-2xl" />
              <span>Booking</span>
            </li>
            <li
              className={`text-2xl  p-5  bg-blue-200 rounded-lg flex items-center gap-3 hover:bg-blue-500 cursor-pointer hover:text-white ${
                active === "support" && "bg-green-500 text-white"
              }`}
              onClick={() => setActive("support")}
            >
              <FiHelpCircle className="text-2xl" />
              <span>Support</span>
            </li>
            <li
              className={`text-2xl  p-5  bg-blue-200 rounded-lg flex items-center gap-3 hover:bg-blue-500 cursor-pointer hover:text-white ${
                active === "feedback" && "bg-green-500 text-white"
              }`}
              onClick={() => setActive("feedback")}
            >
              <FiMessageSquare className="text-2xl" />
              <span>Feedback</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <button className="w-full h-full  p-4  bg-blue-200 rounded-lg flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white ">
          <FiLogOut className="text-2xl" />
          <span className="text-2xl">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
