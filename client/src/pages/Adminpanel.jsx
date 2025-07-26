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



const CustomerDashboard = () => {
  const navigate = useNavigate();
  
  const [active, setActive] = useState("overview");
  const { isLogin , isAdmin } = useAuth();

  useEffect(() => {
    if (!isLogin || !isAdmin) {
      navigate("/login");
    }
  }, [isLogin, isAdmin, navigate]);

 
  return (
    <>
      <div className="flex mt-20 w-screen ">
        <Sidebar active={active} setActive={setActive} />

        <div className=" ">
          {active === "feedback" && <Feedback />}
          {active === "overview" && <Overview />}
          {active === "booking" && <Booking />}
          {active === "package" && <Package />}
          {active === "customer" && <Customer />}
          {active === "query" && <Query />}
          {active === "feedback" && <Feedback />}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
