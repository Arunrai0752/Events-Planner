import React from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className=" bg-[url(bg-homepage.jpg)] h-screen w-full bg-cover bg-center  ">
        <div className=" bg-black/60 h-screen w-screen grid  justify-center  text-white text-2xl  ">
          <div className="  h-[70vh] bg-transparent w-screen relative top-[20vh] grid justify-center text-center items-center">
            <h1 className=" w-screen  text-7xl font-bold text-center ">
              Where Love <br /> Stories Begin
            </h1>
            <p lassName=" w-full   text-7xl font-bold text-center">
              Let us craft the perfect beginning to your forever
            </p>

            <div lassName=" w-full  gap-10 text-8xl font-bold text-center">
              <button onClick={()=> navigate("/login") } className="bg-[#F5E6C8] cursor-pointer text-[#6D4C3D] font-bold border-2 border-transparent px-8 py-3 m-2 hover:bg-[#E8D5B5] hover:text-[#4A3529] hover:border-[#D4AF37] transition-all duration-300  shadow-md hover:shadow-lg rounded-lg hover:scale-[1.02]">
                Plan Your Special Day
              </button>

              <button className="bg-[#FAF7F0] cursor-pointer text-[#B38B6D] font-bold border-2 border-transparent px-6 py-3 m-2 hover:bg-[#F0E6D2] hover:text-[#8A6D56] hover:border-[#C8D5BB] transition-all duration-300 shadow-sm hover:shadow-md rounded-lg hover:scale-[1.01]">
                Discover Our Portfolio
              </button>
              <div className="flex justify-center p-5 text-6xl font-extrabold">
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
