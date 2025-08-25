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
        setIsLogin,
        setIsAdmin} = useAuth();


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
      setIsLogin(true)
       res.data.data.role === "Admin" ?
       (setIsAdmin(true), navigate("/adminpanel") ) 
         
       
       : navigate("/CustomerDashboard") ; 
    } catch (error) {
toast.error(`Error: ${error?.response?.message || ""} | ${error?.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <>
      <main>
        <form
          className="bg-[url(Login.jpg)] bg-cover bg-center h-screen"
          onSubmit={Submitform}
        >
          <div className="bg-neutral/60 h-screen w-screen flex justify-center items-center">
            <div className="h-[65%] w-[40%] bg-base-100/75 rounded-4xl grid justify-center">
              <div className="h-[60%] relative top-5 w-[100%] grid items-center-safe">
                <h1 className="text-center text-primary text-3xl">Log In</h1>

                <div className="h-[60%] w-full text-left relative text-2xl p-2 rounded-2xl">
                  <label className="p-2 w-full text-primary">Email :</label>
                  <input
                    className="px-7 border-2 border-base-300 text-base-content rounded-2xl py-5 outline-0 w-full focus:border-primary transition-colors"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="h-[60%] w-full text-left relative text-2xl p-2 rounded-2xl">
                  <label className="w-full p-2 text-primary">Password :</label>
                  <input
                    className="px-7 border-2 py-5 border-base-300 text-base-content rounded-2xl outline-0 w-full focus:border-primary transition-colors"
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
                  className="bg-primary h-15 rounded-[8px] w-[80%] hover:bg-primary-focus text-primary-content py-3 transition-colors"
                >
                  Log In
                </button>
              </div>
              <div className="flex justify-between px-4 mt-4 text-base-content">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Remember me</span>
                </div>
                <div>
                  <Link className="hover:text-primary transition-colors">Forgot Password ?</Link>
                </div>
              </div>

              <div className="text-center mt-4 text-base-content">
                <h1>
                  Don't Have An Account /{" "}
                  <Link className="underline hover:text-primary transition-colors" to={"/register"}>
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