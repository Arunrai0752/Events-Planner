
import React from "react";
import { Link } from "react-router-dom";
import Usernav from "../components/Usernav";
import UserHero from "../components/UserHero";




const UserDashboard = () => {
  return (
    <>
      <main>
       <Usernav/>
       <UserHero/>

      </main>
    </>
  );
};

export default UserDashboard;
