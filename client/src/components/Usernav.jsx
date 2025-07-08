import React from "react";
import { Link } from "react-router-dom";
import { PiCirclesFour } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";

const Usernav = () => {
  const Navigate = useNavigate();
  return (
    <>
      <nav className="text-black flex items-center justify-around bg-white/50 w-full absolute z-20 p-1  ">
        <div>
          <li className="bg-[url(logo.png)] h-[100px] w-[100px] grid bg-cover bg-center ">
            <Link to="/" className="hover:text-gray-300 relative top-6 right-3">
              <span className="grid justify-center text-2xl items-center text-red-700 ">
                <FaHeart />
              </span>
              <h1 className="text-1xl font-bold text-center text-black  ">
                Two Souls
              </h1>
              <span className="block text-center text-black  text-1xl">
                One Promise
              </span>
            </Link>
          </li>
        </div>
        <div>
          <ul className="flex  gap-8 bg-transparent  list-none items-center font-bold text-white">
            <li>
              <Link to="/about" className="  text-black  hover:text-gray-300">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/stories" className=" text-black   hover:text-gray-300">
                STORIES
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-gray-300  text-black  "
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gray-300  text-black  ">
                GALLERY
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300 text-black  ">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button className=" px-5 py-2 rounded-4xl bg-amber-400  flex justify-center items-center gap-2 bord" onClick={() => Navigate("/UserDashboard")} >
            <span className="h-14 w-20 p-1 flex items-center border-1 rounded-4xl bg-black ">
              <p className="bg-[url(wednesday.jpg)] h-12 w-19 rounded-4xl border-2  p-1 bg-cover bg-no-repeat bg-center "></p>
            </span>
            My Profile
          </button>
        </div>
      </nav>
    </>
  );
};

export default Usernav;
