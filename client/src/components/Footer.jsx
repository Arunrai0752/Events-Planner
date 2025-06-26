import React from "react";
import { FaHeart } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
    <>
      <main>
        <div className="bg-[url(footer.jpg)] h-[600px] text-yellow-800 w-screen bg-center bg-cover flex justify-center ">
          <div className="flex w-[80%] text-start pt-30">
            <div className="w-[20%] ">
              <h1 className="text-3xl py-4">Head Office</h1>
              <p className="py-2 leading-8">
                ArunDevX Events Pvt. Ltd. A-42, Zone-II, MP Nagar Bhopal, Madhya
                Pradesh – 462011
              </p>
              <p className="py-2 leading-8">📧 support@arundevxevents.com 📞 +91 91119 12345</p>
            </div>
            <div className="w-[60%] text-center p-10">
              <div>
                <span>
                  <FaHeart />
                </span>
                <h1 className="text-3xl p-2">Two Souls</h1>
                <p className="p-2">One Promise</p>
              </div>
              <h2 className="leading-8">
                🎉 Weddings | 🎊 Receptions | 📷 Photoshoots | 🎨 Decor & Theme
                Styling | 🍽️ Catering | 📍 Venue Booking
              </h2>

              <div className=" flex justify-center p-10">

                  <ul className=" flex justify-between w-[35%]  text-2xl">
                    <li className=" bg-transparent border-1 rounded-4xl p-2 cursor-pointer"> <FaFacebookF/> </li>
                    <li  className=" bg-transparent border-1 rounded-4xl p-2 cursor-pointer"> <BsTwitterX/> </li>
                    <li  className=" bg-transparent border-1 rounded-4xl p-2 cursor-pointer"> <IoLogoInstagram/> </li>
                    <li  className=" bg-transparent border-1 rounded-4xl p-2 cursor-pointer"> <FaLinkedinIn/> </li>
                   
                  </ul>

              </div>
            </div>
            <div className="w-[20%] text-end ">
              <h1 className="text-3xl py-4">Quick Links</h1>
              <ol className="leading-8">
                <li>Services</li>
                <li>About</li>
                <li>Stories</li>
                <li> Contact Us </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Footer;
