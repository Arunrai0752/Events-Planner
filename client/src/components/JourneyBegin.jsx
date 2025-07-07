import React from "react";
import { FaHeart } from "react-icons/fa";
import img1 from "../assets/img-1.jpg";
import img2 from "../assets/img-2.jpg";
import img3 from "../assets/img-3.jpg";
import bride from "../assets/bride.jpg";
import { Link } from "react-router-dom";

const JourneyBegin = () => {
  return (
    <>
      <main className=" w-screen h-auto pb-40 bg-[#7d6d48]
0   justify-center items-center grid ">
        <div className="w-[85vw] py-10 bg-white relative bottom-18 left-[7.5%]">
          <div className=" text-center">
            <p className="text-6xl flex justify-center p-10 text-pink-500">
              <FaHeart />
            </p>
            <h1 className="text-5xl 	text-[#D4AF37]  p-2">
              "Where Two Paths Become One"
            </h1>
            <p className="text-2xl text-[#6D4C3D] p-3">
              A celebration of love, commitment, and the moments that brought
              you here. Join us as we begin our forever.
            </p>
          </div>
          <div className="flex px-10 py-10 gap-2">
            <div className="w-[50%] pr-1 ">
              <img src={img1} alt="" className="w-full  h-auto" />
            </div>
            <div className="w-[50%] pl-1 flex flex-col gap-1">
              <img src={img2} alt="" className="w-full h-auto pb-2" />
              <img src={img3} alt="" className="w-full h-auto pt-4" />
            </div>
          </div>
        </div>

        <div className="flex w-[85%] relative left-[7.5%]  ">
          <div className="w-[50%] grid gap-7 ">
            <h1 className="text-7xl leading-19 text-[#4A1D4E] pe-10 ">
              What Our Clients Are Saying
            </h1>
            <p className="text-2xl text-pink-600 leading-11  ">
              Fusce ac condimentum turpis. Ut consequat lacinia augue, vitae
              aliquam sapien ullamcorper at. Donec efficitur, ligula ut lacinia
              viverra, lorem lacus condimentum leo, eu luctus dolor ex at quam.
            </p>
            <Link to="/">
              {" "}
              <h1> Read More -{">"} </h1>
            </Link>
          </div>
          <div className="w-[85%] flex ">
            <div className="w-[50%]  relative z-20 top-17 left-40">
              <img src={bride} alt="" className=" h-[100%] w-[100%]" />
            </div>
            <div className="bg-pink-500 w-[65%] h-[112%] text-red-400 text-4xl  px-30 font-bold  ] ">
              <p className="relative right-9 top-15 text-blue-900 z-50">
                {" "}
                Choose a life partner not because you can merely live with them,
                but because you cannot imagine living without them
              </p>
              <br />
              <br />
              <h1 className="relative right-9 top-10 z-50 signature">Arun</h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default JourneyBegin;
