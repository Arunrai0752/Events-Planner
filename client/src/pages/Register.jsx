import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.jsx";
import { toast } from "react-hot-toast";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.cpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await api.post("/auth/register", registerData);
      toast.success(res.data.message);
      setRegisterData({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } catch (error) {
      toast.error(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[url(Register.jpg)] h-screen w-full bg-cover bg-center">
          <div className="bg-neutral/60 h-screen w-full flex justify-center items-center">
            <div className="relative top-10 rounded-4xl h-[70%] w-[40%] grid justify-center bg-base-100 shadow-lg">
              <h1 className="text-center text-4xl py-4 text-primary">Register</h1>
              <div className="flex justify-center">
                <div className="w-[45%] p-2">
                  <label htmlFor="FirstName" className="text-base-content">First Name</label>
                  <input
                    type="name"
                    className="h-fit w-full p-2 outline-0 border border-base-300 rounded-md focus:border-primary"
                    placeholder="Enter Your First Name"
                    value={registerData.firstname}
                    name="firstname"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-[45%] p-2">
                  <label htmlFor="Lastname" className="text-base-content">Last Name</label>
                  <input
                    type="name"
                    className="h-fit w-full p-2 outline-0 border border-base-300 rounded-md focus:border-primary"
                    placeholder="Enter Your Last Name"
                    value={registerData.lastname}
                    name="lastname"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center pb-5">
                <div className="w-[45%] p-2">
                  <label htmlFor="Phone Number" className="text-base-content">Phone Number</label>
                  <input
                    type="Tel"
                    className="h-fit w-full p-2 outline-0 border border-base-300 rounded-md focus:border-primary"
                    placeholder="Enter Your Phone Number"
                    onChange={handleChange}
                    value={registerData.phonenumber}
                    name="phonenumber"
                    required
                  />
                </div>
                <div className="w-[45%] p-2">
                  <label htmlFor="email" className="text-base-content">Email Address</label>
                  <input
                    type="email"
                    className="h-fit w-full p-2 outline-0 border border-base-300 rounded-md focus:border-primary"
                    placeholder="Enter Your Email Address"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-[45%] p-2">
                  <label htmlFor="Password" className="text-base-content">Enter Password</label>
                  <input
                    type="password"
                    className="h-fit w-full p-2 outline-0 border border-base-300 rounded-md focus:border-primary"
                    placeholder="Enter A Strong Password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-[45%] p-2">
                  <label htmlFor="Lastname" className="text-base-content">Confirm Password</label>
                  <input
                    type="password"
                    className="h-fit w-full p-2 outline-0 border border-base-300 rounded-md focus:border-primary"
                    placeholder="Re-Enter Your Password"
                    name="cpassword"
                    value={registerData.cpassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-center py-4">
                <button className="bg-primary text-primary-content w-[70%] p-3 rounded-md cursor-pointer hover:bg-primary-focus transition-colors">
                  Register
                </button>
              </div>

              <div className="w-full flex justify-center py-4">
                <h1 className="text-base-content">
                  Already Have An Account?{" "}
                  <Link to="/login" className="text-info underline">
                    Login Here
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;