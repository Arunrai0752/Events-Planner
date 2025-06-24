import React from "react";
import { Link } from "react-router-dom"; 
import { PiCirclesFour } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {

  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-10 p-4 " >
      <div className="h-[15vh] w-full bg-transparent flex justify-center items-center">
        <ul className="flex w-[75vw] justify-around bg-transparent gap-4 list-none items-center font-bold text-white">
          <li><Link to="/" className="  text-amber-400 hover:text-gray-300 flex items-center"><PiCirclesFour />HOME</Link></li>
          <li><Link to="/about" className="  text-amber-400 hover:text-gray-300">ABOUT</Link></li>
          <li><Link to="/stories" className="  text-amber-400 hover:text-gray-300">STORIES</Link></li>
          <li className="bg-[url(logo.png)] h-[150px] w-[150px] grid bg-cover bg-center " >
            <Link to="/" className="hover:text-gray-300 relative top-15 right-3">
            <span className="grid justify-center text-2xl items-center text-pink-500 ">
             
            <FaHeart />
             </span>
              <h1 className="text-2xl font-bold text-center  text-white ">Two Souls</h1>
              <span className="block text-center text-white text-1xl">One Promise</span>
            </Link>
          </li>
          <li><Link to="/services" className="hover:text-gray-300  text-amber-400 ">SERVICES</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-300  text-amber-400 ">GALLERY</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300  text-amber-400">CONTACT</Link></li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;