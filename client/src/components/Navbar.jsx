import React from "react";
import { Link } from "react-router-dom"; 
import { PiCirclesFour } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";





const Navbar = () => {
  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-10 p-4">
      <div className="h-[15vh] w-full bg-transparent flex justify-center items-center">
        <ul className="flex w-[75vw] justify-around bg-transparent list-none items-center font-bold text-white">
          <li><Link to="/" className="hover:text-gray-300 flex items-center"><PiCirclesFour />HOME</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">ABOUT</Link></li>
          <li><Link to="/stories" className="hover:text-gray-300">STORIES</Link></li>
          <li><Link to="/morepages" className="hover:text-gray-300">MORE PAGES</Link></li>
          <li>
            <Link to="/" className="hover:text-gray-300">
            <span className="grid justify-center text-2xl items-center text-pink-500 ">
             
            <FaHeart />
             </span>
              <h1 className="text-2xl font-bold text-center">Wedding</h1>
              <span className="block text-center text-gray-500 text-1xl">Template</span>
            </Link>
          </li>
          <li><Link to="/services" className="hover:text-gray-300">SERVICES</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-300">GALLERY</Link></li>
          <li><Link to="/elements" className="hover:text-gray-300">ELEMENTS</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300">CONTACT</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;