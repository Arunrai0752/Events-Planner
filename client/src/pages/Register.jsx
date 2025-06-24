import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <form>
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
                  />
                </div>
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="Lastname"> Last Name</label>
                  <input
                    type="name"
                    className="h-fit w-full p-2 outline-0  "
                    placeholder="Enter Your Last Name"
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
                  />
                </div>
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="email"> Email Address</label>
                  <input
                    type="email"
                    className="h-fit w-full p-2 outline-0 "
                    placeholder="Enter Your  Email Address "
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
                  />
                </div>
                <div className=" w-[45%] h-[30% ] p-2">
                  <label htmlFor="Lastname"> Confirm Password</label>
                  <input
                    type="password"
                    className="h-fit w-full p-2 outline-0  "
                    placeholder="Re-Enter Your Password"
                  />
                </div>
              </div >




              <div className="w-full flex justify-center i">

                    <button className="Registerbutton bg-amber-400 w-[70%] h-[100%] cursor-pointer hover:bg-green-400 hover:text-amber-800 " >Register</button>

                
              </div>


               <div className="w-full flex h-[20%] justify-center py-4">

              <h1>Already Have An Account/  <Link to="/login" className="underline" > Login Here </Link>  </h1>
                
              </div>
            
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
