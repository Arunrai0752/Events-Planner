import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.jsx";
import {toast}  from "react-hot-toast";
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
    console.log(registerData);

    try {
      const res = await api.post("/auth/register",registerData);
      toast.success(res.data.message)
       setRegisterData({
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      password: "",
      cpassword: "",
    });
    } catch (error) {
      toast.error(`Error : , ${error.response.message}`);
    }

   
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[url(Register.jpg)] h-screen wifull bg-cover bg-center">
          <div className="bg-black/70 h-screen wifull flex justify-center items-center  ">
            <div className="relative top-10 rounded-4xl h-[70%] w-[40%] grid justify-center  bg-white">
              <h1 className="text-center text-4xl py-4">Register</h1>
              <div className="flex justify-center  ">
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="FirstName"> First Name</label>
                  <input
                    type="name"
                    className="h-fit w-full p-2 outline-0 "
                    placeholder="Enter Your First Name"
                    value={registerData.firstname}
                    name="firstname"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="Lastname"> Last Name</label>
                  <input
                    type="name"
                    className="h-fit w-full p-2 outline-0  "
                    placeholder="Enter Your Last Name"
                    value={registerData.lastname}
                    name="lastname"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center pb-5 ">
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="Phone Number"> Phone Number </label>
                  <input
                    type="Tel"
                    className="h-fit w-full p-2 outline-0 "
                    placeholder="Enter Your Phone Number"
                    onChange={handleChange}
                    value={registerData.phonenumber}
                    name="phonenumber"
                    required
                  />
                </div>
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="email"> Email Address</label>
                  <input
                    type="email"
                    className="h-fit w-full p-2 outline-0 "
                    placeholder="Enter Your  Email Address "
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center ">
                <div className=" w-[45%] h-[30%] p-2">
                  <label htmlFor="Password">Enter Password </label>
                  <input
                    type="password"
                    className="h-fit w-full p-2 outline-0 "
                    placeholder="Enter A Strong Password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="Lastname"> Confirm Password</label>
                  <input
                    type="password"
                    className="h-fit w-full p-2 outline-0  "
                    placeholder="Re-Enter Your Password"
                    name="cpassword"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-center i">
                <button className="Registerbutton bg-amber-400 w-[70%] h-[100%] cursor-pointer hover:bg-green-400 hover:text-amber-800 ">
                  Register
                </button>
              </div>

              <div className="w-full flex h-[20%] justify-center py-4">
                <h1>
                  Already Have An Account/{" "}
                  <Link to="/login" className="underline">
                    {" "}
                    Login Here{" "}
                  </Link>{" "}
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
