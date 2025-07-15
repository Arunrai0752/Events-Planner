import React from "react";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiHelpCircle,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const handelLogout = async () => {
    const res = await api.get("/auth/logout");
    navigate("/");
  };

  return (
    <div className="h-[90.7vh] w-[25vw] p-10 flex flex-col justify-between bg-gradient-to-bl from-pink-200 to-rose-200 fixed">
      <div>
        <div className="text-3xl border-b-2 border-pink-300 p-5 text-center flex items-center justify-center gap-2 text-pink-700">
          <span>Customer Dashboard</span>
        </div>
        <div className="p-10">
          <ul className="grid gap-4">
            <li
              className={`text-2xl p-5 bg-pink-50 rounded-lg flex items-center gap-3 hover:bg-pink-400 cursor-pointer hover:text-white ${
                active === "profile" && "bg-pink-500 text-white"
              }`}
              onClick={() => setActive("profile")}
            >
              <FiUser className="text-2xl" />
              <span>Profile</span>
            </li>
            <li
              className={`text-2xl p-5 bg-pink-50 rounded-lg flex items-center gap-3 hover:bg-pink-400 cursor-pointer hover:text-white ${
                active === "overview" && "bg-pink-500 text-white"
              }`}
              onClick={() => setActive("overview")}
            >
              <FiHome className="text-2xl" />
              <span>Overview</span>
            </li>
            <li
              className={`text-2xl p-5 bg-pink-50 rounded-lg flex items-center gap-3 hover:bg-pink-400 cursor-pointer hover:text-white ${
                active === "booking" && "bg-pink-500 text-white"
              }`}
              onClick={() => setActive("booking")}
            >
              <FiCalendar className="text-2xl" />
              <span>Booking</span>
            </li>
            <li
              className={`text-2xl p-5 bg-pink-50 rounded-lg flex items-center gap-3 hover:bg-pink-400 cursor-pointer hover:text-white ${
                active === "support" && "bg-pink-500 text-white"
              }`}
              onClick={() => setActive("support")}
            >
              <FiHelpCircle className="text-2xl" />
              <span>Support</span>
            </li>
            <li
              className={`text-2xl p-5 bg-pink-50 rounded-lg flex items-center gap-3 hover:bg-pink-400 cursor-pointer hover:text-white ${
                active === "feedback" && "bg-pink-500 text-white"
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
        <button
          onClick={handelLogout}
          className="w-full h-full p-4 bg-pink-50 rounded-lg flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white"
        >
          <FiLogOut className="text-2xl" />
          <span className="text-2xl">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;