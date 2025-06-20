import React from "react";
import { CiDesktopMouse2 } from "react-icons/ci";


const Hero = () => {
  return (
    <>
      <main className=" bg-[url(bg-homepage.jpg)] h-screen w-full bg-cover bg-center ">
        <div className=" bg-black/45 h-screen w-screen grid  justify-center  text-white text-2xl  ">
          <div className="  h-[70vh] bg-transparent w-screen relative top-[20vh] grid justify-center text-center items-center">
            <h1 className=" w-screen  text-7xl font-bold text-center ">
              Turning Dreams <br /> into Reality
            </h1>
            <p lassName=" w-full   text-7xl font-bold text-center">
              Donec efficitur, ligula ut lacinia viverra, lorem lacus
              condimentum leo, eu luctus <br /> dolor ex at quam. Fusce ac
              condimentum turpis. Ut consequat lacinia augue
            </p>

            <div lassName=" w-full  gap-10 text-8xl font-bold text-center">
              <button className=" bg-pink-400 tect-white font-bold border-0 border-pink-400 px-6 py-3 m-2 hover:bg-pink-500">Book Now</button>
              <button className=" bg-transparent text-pink-400 font-bold border-1 border-pink-400 px-6 py-3 m-2  hover:bg-pink-500 hover:text-white" >Read More</button>
            
             <div className="flex justify-center p-5 text-6xl font-extrabold">

              <span><CiDesktopMouse2 /></span>

            </div>
            </div>

           
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
