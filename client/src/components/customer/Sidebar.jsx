import React from "react";
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiHelpCircle,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";
// import api from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handelLogout = async () => {
    // const res = await api.get("/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="h-[90.7vh] w-[25vw] p-10 flex flex-col justify-between bg-base-200 fixed">
      <div>
        <div className="text-3xl border-b-2 border-base-300 p-5 text-center flex items-center justify-center gap-2 text-base-content">
          <span>Customer Dashboard</span>
        </div>
        <div className="p-10">
          <ul className="grid gap-4">
            <li
              className={`text-2xl p-5 bg-base-100 rounded-lg flex items-center gap-3 hover:bg-primary cursor-pointer hover:text-primary-content ${
                active === "profile" && "bg-primary text-primary-content"
              }`}
              onClick={() => setActive("profile")}
            >
              <FiUser className="text-2xl" />
              <span>Profile</span>
            </li>
            <li
              className={`text-2xl p-5 bg-base-100 rounded-lg flex items-center gap-3 hover:bg-primary cursor-pointer hover:text-primary-content ${
                active === "overview" && "bg-primary text-primary-content"
              }`}
              onClick={() => setActive("overview")}
            >
              <FiHome className="text-2xl" />
              <span>Overview</span>
            </li>
            <li
              className={`text-2xl p-5 bg-base-100 rounded-lg flex items-center gap-3 hover:bg-primary cursor-pointer hover:text-primary-content ${
                active === "booking" && "bg-primary text-primary-content"
              }`}
              onClick={() => setActive("booking")}
            >
              <FiCalendar className="text-2xl" />
              <span>Booking</span>
            </li>
            <li
              className={`text-2xl p-5 bg-base-100 rounded-lg flex items-center gap-3 hover:bg-primary cursor-pointer hover:text-primary-content ${
                active === "support" && "bg-primary text-primary-content"
              }`}
              onClick={() => setActive("support")}
            >
              <FiHelpCircle className="text-2xl" />
              <span>Support</span>
            </li>
            <li
              className={`text-2xl p-5 bg-base-100 rounded-lg flex items-center gap-3 hover:bg-primary cursor-pointer hover:text-primary-content ${
                active === "feedback" && "bg-primary text-primary-content"
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
          className="w-full h-full p-4 bg-error rounded-lg flex items-center justify-center gap-3 hover:bg-error/90 text-error-content"
        >
          <FiLogOut className="text-2xl" />
          <span className="text-2xl">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;