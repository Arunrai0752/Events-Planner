import React, { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { LuPhone } from "react-icons/lu";
import api from "../../config/api.jsx";
import toast from "react-hot-toast";
import {
  FaVenus,
  FaMars,
  FaTransgender,
  FaBriefcase,
  FaHome,
  FaMapMarkerAlt,
  FaFlag,
  FaUserTie,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import EditProfile from "./Modal/EditProfile.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditModelOpen, setIsEditModelOpen] = useState(false)
  const { user, isLogin  } = useAuth();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    photo: null ,
  });

  const fetchUserData = async () => {
    setUserData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
      photo: user.photo,
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [isEditModelOpen ]);

  return (
    <main className="bg-gradient-to-r from-base-200 to-base-300 flex justify-evenly items-center w-[75vw] min-h-[90.7vh] absolute right-0">
      <div className="bg-base-100 rounded-xl shadow-lg text-center text-2xl gap-8 w-full max-w-4xl mx-4">
        <div className="py-12 border-b-2 border-base-300 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="h-32 w-32 rounded-full flex items-center justify-center bg-primary/20">
              <img
                src={userData.photo}
                alt=""
                className="h-32 w-32 rounded-full object-cover border-4 border-primary/30"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-base-content">
            {userData.firstname} {userData.lastname}
          </h2>
          <p className="text-base-content/70 mt-1">Member since 2025</p>
          <button
            className="px-6 py-2 mt-4 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => { setIsEditModelOpen(true) }}
          >
            Edit Profile
          </button>

          <div className="p-6 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-info/20 p-3 rounded-full mr-4">
                  <TfiEmail className="text-info text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content">
                  Email Address
                </h3>
              </div>
              <p className="text-base-content/80">{userData.email}</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-success/20 p-3 rounded-full mr-4">
                  <LuPhone className="text-success text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content">
                  Phone Number
                </h3>
              </div>
              <p className="text-base-content/80">{userData.phonenumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 px-8 py-6 text-center">
          <div className="p-4 text-2xl font-semibold text-base-content border-b-2 border-base-300">
            Additional Information
          </div>

          <div className="flex justify-center py-8 items-start gap-16">
            <div className="grid gap-8">
              <div className="flex items-center">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  {userData.gender === "male" ? (
                    <FaMars className="text-primary text-xl" />
                  ) : userData.gender === "female" ? (
                    <FaVenus className="text-primary text-xl" />
                  ) : (
                    <FaTransgender className="text-primary text-xl" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-base-content w-32">Gender</h3>
              </div>

              <div className="flex items-center">
                <div className="bg-secondary/20 p-3 rounded-full mr-4">
                  <FaBriefcase className="text-secondary text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content w-32">
                  Occupation
                </h3>
              </div>

              <div className="flex items-center">
                <div className="bg-accent/20 p-3 rounded-full mr-4">
                  <FaHome className="text-accent text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content w-32">
                  Address
                </h3>
              </div>

              <div className="flex items-center">
                <div className="bg-info/20 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-info text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content w-32">City</h3>
              </div>

              <div className="flex items-center">
                <div className="bg-warning/20 p-3 rounded-full mr-4">
                  <FaFlag className="text-warning text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content w-32">State</h3>
              </div>

              <div className="flex items-center">
                <div className="bg-success/20 p-3 rounded-full mr-4">
                  <FaUserTie className="text-success text-xl" />
                </div>
                <h3 className="text-lg font-medium text-base-content w-32">
                  Representing
                </h3>
              </div>
            </div>

            <div className="grid gap-8">
              <div className="flex items-center h-12">
                <p className="text-base-content/80 capitalize min-w-[120px] text-left">
                  {userData.gender || "N/A"}
                </p>
              </div>

              <div className="flex items-center h-12">
                <p className="text-base-content/80 min-w-[120px] text-left">
                  {userData.occupation || "N/A"}
                </p>
              </div>

              <div className="flex items-center h-12">
                <p className="text-base-content/80 min-w-[120px] text-left">{userData.address || "N/A"}</p>
              </div>

              <div className="flex items-center h-12">
                <p className="text-base-content/80 min-w-[120px] text-left">{userData.city || "N/A"}</p>
              </div>

              <div className="flex items-center h-12">
                <p className="text-base-content/80 min-w-[120px] text-left">{userData.state || "N/A"}</p>
              </div>

              <div className="flex items-center h-12">
                <p className="text-base-content/80 capitalize min-w-[120px] text-left">
                  {userData.representing || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfile
        isOpen={isEditModelOpen}
        onClose={() => setIsEditModelOpen(false)}
        oldData={userData}
      />
    </main>
  );
};

export default Profile;