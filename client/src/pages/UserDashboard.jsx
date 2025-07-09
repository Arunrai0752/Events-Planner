import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { LuPhone } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import api from "../config/api.jsx";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    firstname: "DevXArun",
    lastname: "FSD",
    email: "arunr2081@gmail.com",
    phonenumber: "0000000000",
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

  useEffect(() =>  {
    fetchUserData();
  }, []);

  return (
    <main className="bg-blue-300 min-h-screen  ">
      <div className="relative top-20">
        <div className="bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-black text-center text-4xl to-blue-400 p-8 text-white">
            
            <p className="opacity-90 mt-2">Welcome to your dashboard</p>
          </div>
          <div className=" grid justify-center gap-8 p-8">
            <div className=" bg-gray-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
              <div className="relative mb-6">
                <div className=" bg-[url(wednesday.jpg)] bg-cover bg-center h-32 w-32 rounded-full  flex items-center justify-center"></div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData.firstname} {userData.lastname}
              </h2>
              <p className="text-gray-500 mt-1">Member since 2023</p>
              <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Edit Profile
              </button>
            </div>

            <div className=" flex ">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <TfiEmail className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Email Address
                  </h3>
                </div>
                <p className="text-gray-600 pl-16">{userData.email}</p>
                <button className="mt-4 ml-16 text-sm text-blue-600 hover:text-blue-800">
                  Change Email
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <LuPhone className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Phone Number
                  </h3>
                </div>
                <p className="text-gray-600 pl-16">{userData.phonenumber}</p>
                <button className="mt-4 ml-16 text-sm text-blue-600 hover:text-blue-800">
                  Update Phone
                </button>
              </div>
            </div>

            <div className="bg-white p-6 
            text-center rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Account Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-medium text-green-600">Active</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="font-medium">
                    {userData?.createdAt
                      ? userData.updatedAt.split("T")[0]
                      : "Loading..."}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium">Premium Member</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Change Password
                  </button>
                  <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Privacy Settings
                  </button>
                  <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Notification
                  </button>
                  <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
