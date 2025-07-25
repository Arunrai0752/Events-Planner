import React, { useEffect, useState } from "react";
import Sidebar from "../components/customer/Sidebar";
import Overview from "../components/customer/Overview";
import Booking from "../components/customer/Booking";
import Profile from "../components/customer/Profile";
import Support from "../components/customer/Support";
import Feedback from "../components/customer/feedback";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const CustomerDashboard = () => {
  const navigate = useNavigate();
  
  const [active, setActive] = useState("profile");
  const { isLogin , isAdmin } = useAuth();

  useEffect(() => {
    if (!isLogin || isAdmin) {
      navigate("/login");
    }
  }, [isLogin, isAdmin, navigate]);

 
  return (
    <>
      <div className="flex mt-20 w-screen ">
        <Sidebar active={active} setActive={setActive} />

        <div className=" ">
          {active === "overview" && <Overview />}
          {active === "booking" && <Booking />}
          {active === "profile" && <Profile />}
          {active === "support" && <Support />}
          {active === "feedback" && <Feedback />}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
