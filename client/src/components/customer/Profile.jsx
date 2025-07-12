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

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "DevXArun",
    lastname: "FSD",
    email: "arunr2081@gmail.com",
    phonenumber: "0000000000",
    photo: "",
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main className="bg-gradient-to-r from-red-200 flex justify-evenly items-center  w-[75vw] to-indigo-200 min-h-[90.7vh] absolute right-0 ">
      <div className="   bg-transperents  rounded-xl    text-center text-2xl gap-8">
        <div className="  py-20 border-b-2  p-70 flex flex-col items-center    ">
          <div className="relative mb-6">
            <div
              className=" h-32 w-32 rounded-full  flex items-center justify-center  bg-amber-400
                "
            >
              <img
                src={userData.photo}
                alt=""
                className="h-32 w-32 rounded-full object-cover "
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {userData.firstname} {userData.lastname}
          </h2>
          <p className="text-gray-500 mt-1">Member since 2025</p>
          <button
            className=" px-6 py-2 mt-2  bg-yellow-500 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => navigate("/EditUserDashboard")}
          >
            Edit Profile
          </button>

          <div className=" p-6   ">
            <div className=" flex items-center  ">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <TfiEmail className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  Email Address
                </h3>
              </div>
              <p className="text-gray-600 pl-16">{userData.email}</p>
            </div>

            <div className=" flex items-center   ">
              <div className="flex items-center justify-between  mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <LuPhone className="text-green-600 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  Phone Number
                </h3>
              </div>
              <p className="text-gray-600 pl-16">{userData.phonenumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-transparent  justify-center items-center h-[87vh]  px-20  text-center text-2xl gap-8 w-full">
          <div className="p-5 text-3xl text-center border-b-2">
            Additional information
          </div>

          <div className="flex flex-col gap-10 justify-between py-10 items-center">
            {/* Gender */}
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                {userData.gender === "male" ? (
                  <FaMars className="text-green-600 text-xl" />
                ) : userData.gender === "female" ? (
                  <FaVenus className="text-green-600 text-xl" />
                ) : (
                  <FaTransgender className="text-green-600 text-xl" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-700 w-32">Gender</h3>
              <p className="text-gray-600 pl-8 capitalize">
                {userData.gender || "N/A"}
              </p>
            </div>

            {/* Occupation */}
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaBriefcase className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 w-32">
                Occupation
              </h3>
              <p className="text-gray-600 pl-8">
                {userData.occupation || "N/A"}
              </p>
            </div>

            {/* Address */}
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaHome className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 w-32">
                Address
              </h3>
              <p className="text-gray-600 pl-8">{userData.address || "N/A"}</p>
            </div>

            {/* City */}
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 w-32">City</h3>
              <p className="text-gray-600 pl-8">{userData.city || "N/A"}</p>
            </div>

            {/* State */}
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaFlag className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 w-32">State</h3>
              <p className="text-gray-600 pl-8">{userData.state || "N/A"}</p>
            </div>

            {/* Representing */}
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaUserTie className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 w-32">
                Representing
              </h3>
              <p className="text-gray-600 pl-8 capitalize">
                {userData.representing || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Profile;
