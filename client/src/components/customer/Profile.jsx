import React, { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { LuPhone } from "react-icons/lu";
import api from "../../config/api.jsx";
import toast from "react-hot-toast";
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
    <main className="bg-gradient-to-r from-red-200   to-indigo-200 min-h-[90.1vh] relative ">
      <div className=" ">
        <div className=" flex  justify-center  text-center text-2xl gap-8 p-8">
          <div className="  bg-white  rounded-xl p-6 shadow-sm flex flex-col items-center">
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
            <p className="text-gray-500 mt-1">Member since 2023</p>
          </div>



           <div className=" flex gap-2  bg-white   p-6 rounded-xl shadow-sm">
            <div className=" p-6 ">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <TfiEmail className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  Email Address
                </h3>
              </div>
              <p className="text-gray-600 pl-16">{userData.email}</p>
            </div>

            <div className="bg p-6 ">
              <div className="flex items-center mb-4">
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
      </div>
      <button
        className=" px-8 py-3 absolute top-1 right-1 bg-yellow-500 text-white rounded-lg hover:bg-red-700 transition-colors"
        onClick={() => navigate("/EditUserDashboard")}
      >
        Edit Profile
      </button>
    </main>
  );
};
export default Profile;
