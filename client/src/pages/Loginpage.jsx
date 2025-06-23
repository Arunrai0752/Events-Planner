import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submitform = (e) => {
    e.preventDefault();

    const loginData = {
      Email: email,
      Password: password,
    };
    console.log(loginData);

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <main>
        <form  className="bg-[url(Login.jpg)] bg-cover bg-fixed bg-center  h-screen" 
                  onSubmit={Submitform} 
 >
          <div className="bg-black/60 h-screen w-screen  flex justify-center  items-center">
            <div className="h-[60%] w-[40%] bg-white/75 rounded-4xl  grid justify-center  ">
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

              <div className="w-full flex justify-center items-center">
                <button className="bg-amber-300 h-15 rounded-[8px] w-[80%] hover:bg-amber-700 hover:text-amber-400 ">
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
                  <Link onClick={() => navigate("/register")} to={"/register"}>
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
