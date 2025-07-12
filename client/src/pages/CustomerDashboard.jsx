import React, { useState } from "react";
import Sidebar from "../components/customer/Sidebar";
import Overview from "../components/customer/Overview";
import Booking from "../components/customer/Booking";
import Profile from "../components/customer/Profile";
import Support from "../components/customer/Support";
import Feedback from "../components/customer/feedback";

const CustomerDashboard = () => {
  const [active, setActive] = useState("profile");
  return (
    <>
      <div className="flex mt-20">
        <Sidebar active={active} setActive={setActive} />

        <div className="border-2 w-full ">
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
