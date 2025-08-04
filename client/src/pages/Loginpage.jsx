import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.jsx";
import {toast} from "react-hot-toast"
import Profile from "../components/customer/Profile.jsx";
import { useAuth } from "../context/AuthContext.jsx";


const Loginpage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user,
        isLogin,
        isAdmin,
        setUser,
        setISLogin,
        setIsAdmin,} = useAuth();


  const Submitform = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };


    try {
      const res = await api.post("/auth/login", loginData);
      toast.success(res.data.message);
      setEmail("");
      setPassword("");
      setUser(res.data.data)
      sessionStorage.setItem("EventUser" , JSON.stringify(res.data.data));
      setISLogin(true)
       res.data.data.role === "Admin" ?
       (setIsAdmin(true), navigate("/adminpanel")) 
       : navigate("/CustomerDashboard") ; 
    } catch (error) {
toast.error(`Error: ${error?.response?.message || ""} | ${error?.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <>
      <main>
        <form
          className="bg-[url(Login.jpg)] bg-cover bg-center  h-screen"
          onSubmit={Submitform}
        >
          <div className="bg-black/60 h-screen w-screen  flex justify-center  items-center">
            <div className="h-[65%] w-[40%] bg-white/75 rounded-4xl  grid justify-center  ">
              <div className="h-[60%] relative top-5  w-[100%]  grid items-center-safe">
                <h1 className="text-center text-orange-900 text-3xl">Log In</h1>

                <div className=" h-[60%] w-full  text-left  relative text-2xl  p-2  rounded-2xl border-amber-300">
                  <label className="p-2 w-full text-blue-500 ">Email :</label>
                  <input
                    className="px-7 border-2  border-amber-300 text-amber-700 rounded-2xl py-5 outline-0  w-full "
                    type="email"
                    placeholder="Enter your  Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className=" h-[60%] w-full  text-left relative text-2xl  p-2 rounded-2xl border-amber-300 ">
                  <label className="w-full p-2 text-blue-500">Password :</label>
                  <input
                    className="px-7 border-2 py-5  border-amber-300  text-amber-700 rounded-2xl outline-0 w-full "
                    type="password"
                    value={password}
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex justify-center items-center mt-8">
                <button
                  type="submit"
                  className="bg-amber-300 h-15 rounded-[8px] w-[80%] hover:bg-amber-700 hover:text-amber-400 "
                >
                  Log In
                </button>
              </div>
              <div className="flex justify-between">
                <div>
                  <input type="checkbox" />
                  <span>Remeber me</span>
                </div>
                <div>
                  <Link>Forgot Password ? </Link>
                </div>
              </div>

              <div className="text-center">
                <h1>
                  Dont Have An Account /{" "}
                  <Link className="underline" to={"/register"}>
                    Register Here
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Loginpage;
