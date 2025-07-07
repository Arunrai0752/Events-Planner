import React from "react";
import { Link } from "react-router-dom"; 
import { PiCirclesFour } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";

const Usernav = () => {
  return <>
  
    <nav className="text-black flex items-center justify-around bg-white w-full absolute z-20 p-1  ">
         <div>
           <li className="bg-[url(logo.png)] h-[100px] w-[100px] grid bg-cover bg-center ">
            <Link
              to="/"
              className="hover:text-gray-300 relative top-6 right-3"
            >
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
                      <li><Link to="/" className=" text-black   hover:text-gray-300 flex items-center"><PiCirclesFour />HOME</Link></li>
                      <li><Link to="/about" className="  text-black  hover:text-gray-300">ABOUT</Link></li>
                      <li><Link to="/stories" className=" text-black   hover:text-gray-300">STORIES</Link></li>
                      <li><Link to="/services" className="hover:text-gray-300  text-black  ">SERVICES</Link></li>
                      <li><Link to="/gallery" className="hover:text-gray-300  text-black  ">GALLERY</Link></li>
                      <li><Link to="/contact" className="hover:text-gray-300 text-black  ">CONTACT</Link></li>
                      
                    </ul>
          </div>
          <div>

            <button className=" px-15 py-4 rounded-4xl bg-yellow-400">Purchase Now</button>
          </div>
        </nav>
  
  </>
};

export default Usernav;
