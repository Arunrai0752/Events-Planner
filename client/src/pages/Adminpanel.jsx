import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import Overview from "../components/Admin/Overview";
import Booking from "../components/Admin/Booking";
import Package from "../components/Admin/Packages";
import Customer from "../components/Admin/Customer";
import Query from "../components/Admin/CusrtomerQuery";
import Feedback from "../components/Admin/CustomerFeedback";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Adminpanel = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const { isLogin, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLogin || !isAdmin) {
      navigate("/login");
    }
  }, [isLogin, isAdmin, navigate]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      <div className="flex flex-1 overflow-hidden pt-20"> 
        
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white shadow-md z-10">
          <Sidebar active={active} setActive={setActive} />
        </div>

       
        <div className="flex-1 ml-64 overflow-y-auto p-6">
          {active === "overview" && <Overview />}
          {active === "booking" && <Booking />}
          {active === "package" && <Package />}
          {active === "customer" && <Customer />}
          {active === "query" && <Query />}
          {active === "feedback" && <Feedback />}
        </div>
      </div>
    </div>
  );
};

export default Adminpanel;