import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import chat from "../assets/lets-chat.jpg";

const Contactdetails = () => {
  return (
    <>
      <main>
        <div className="bg-blue-100 w-screen grid    ">
          <div className=" w-[85%] flex bg-gray-200 rounded-4xl text-center  justify-evenly mb-20 relative left-[7.5%] bottom-[80px]">
            <div className=" w-[27%] grid p-5 gap-5 ">
              <div className="flex justify-center">
                <p className="text-6xl text-center ">
                  <CiLocationOn />
                </p>
              </div>
              <h1 className="text-4xl">Physical Address​</h1>
              <p className="text-1xl leading-9">
                Ricr, Minal Mall , 4th Floor , Raj Group , Coding Institute{" "}
              </p>
            </div>

            <div className=" w-[27%] grid  p-5 ">
              <div className="flex justify-center">
                <p className="text-6xl text-center ">
                  <MdOutlineMail />
                </p>
              </div>
              <h1 className="text-4xl">Email Address​</h1>
              <p className="text-1xl grid leading-9">
<a href="mailto:arunr2081@gmail.com" target="_blank" rel="noopener noreferrer">
  arunr2081@gmail.com
</a>

<a href="mailto:realarunrai0752@gmail.com" target="_blank" rel="noopener noreferrer">
  realarunrai0752@gmail.com
</a>

              </p>
            </div>

            <div className=" w-[27%] grid p-5  ">
              <div className="flex justify-center">
                <p className="text-6xl text-center ">
                  <IoPhonePortraitOutline />
                </p>
              </div>
              <h1 className="text-4xl">Phone Number​</h1>
              <a href="tel: +919098209835" className="text-1xl leading-9">9098209835</a>
            </div>
          </div>

          <div className=" w-[85%] flex bg-yellow-50  text-center  justify-evenly mb-20 relative left-[7.5%] bottom-[80px]">
            <div className="w-[50%] ">
              <img src={chat} alt="" className=" h-[900px] bg-center " />
            </div>

            <div className="w-[50%]  bg-center ng-cover flex justify-center items-center  ">
              <div className="h-[70%] w-full ">
                <h1 className="text-4xl relative text-left py-15 ps-10 ">
                  Let’s Chat
                </h1>

                <div className=" grid ps-10  text-1xl p-10 gap-8 ">
                  <input
                    type="name"
                    placeholder="Name"
                    className="outline-0 border-b-2"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="outline-0 border-b-2"
                  />

                  <select
                    name="Budgets"
                    id="budgets"
                    className="outline-0 border-b-2"
                  >
                    <option value="budgets">Budgets</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>

                  <textarea
                  placeholder="Message"
                    name=""
                    className=" outline-0  border-b-2 h-[150px] pb-30 text-[18px]"
                    id=""
                  ></textarea>
                </div>

                <div className="flex justify-start p-10">
                  <button
                    type="submit"
                    className=" bg-black text-white px-8 py-2 "
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contactdetails;
