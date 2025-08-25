import React from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="bg-[url(bg-homepage.jpg)] h-screen w-full bg-cover bg-center">
        <div className="bg-neutral/60 h-screen w-screen grid justify-center text-primary-content text-2xl">
          <div className="h-[70vh] bg-transparent w-screen relative top-[20vh] grid justify-center text-center items-center">
            <h1 className="w-screen text-7xl font-bold text-center">
              Where Love <br /> Stories Begin
            </h1>
            <p className="text-primary-content/90">
              Let us craft the perfect beginning to your forever
            </p>

            <div className="animate-pulse">
              <button 
                onClick={() => navigate("/register")} 
                className="bg-primary cursor-pointer text-primary-content font-bold border-2 border-transparent px-8 py-3 m-2 hover:bg-primary-focus hover:text-primary-content hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg rounded-lg hover:scale-[1.02]"
              >
                Register
              </button>

              <button className="bg-base-100 cursor-pointer text-base-content font-bold border-2 border-transparent px-6 py-3 m-2 hover:bg-base-200 hover:text-base-content hover:border-base-300 transition-all duration-300 shadow-sm hover:shadow-md rounded-lg hover:scale-[1.01]">
                Discover Our Portfolio
              </button>
              <div className="flex justify-center p-5 text-6xl font-extrabold text-primary">
                <span>
                  <CiDesktopMouse2 />
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;