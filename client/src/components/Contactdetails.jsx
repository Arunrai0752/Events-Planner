import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import chat from "../assets/lets-chat.jpg";
import toast from "react-hot-toast";
import api from "../config/api.jsx";

const Contactdetails = () => {
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.subject || !contactData.message) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/public/contact", contactData);
      toast.success(res.data.message);
      console.log(res.data.data);

      setContactData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 -mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center text-blue-600 mb-6">
              <CiLocationOn className="text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Physical Address</h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Ricr, Minal Mall, 4th Floor<br />
              Raj Group, Coding Institute
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center text-blue-600 mb-6">
              <MdOutlineMail className="text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Email Address</h2>
            <div className="text-gray-600 text-center space-y-2">
              <a
                href="mailto:arunr2081@gmail.com"
                className="block hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                arunr2081@gmail.com
              </a>
              <a
                href="mailto:realarunrai0752@gmail.com"
                className="block hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                realarunrai0752@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center text-blue-600 mb-6">
              <IoPhonePortraitOutline className="text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Phone Number</h2>
            <a
              href="tel:+919098209835"
              className="text-gray-600 hover:text-blue-600 transition-colors block text-center"
            >
              +91 9098209835
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={chat}
                alt="Let's Chat"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Let's Chat</h1>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    onChange={handleOnChange}
                    value={contactData.name}
                    name="name"
                    placeholder="Name *"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleOnChange}
                    placeholder="Email *"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleOnChange}
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={contactData.subject}
                    onChange={handleOnChange}
                    placeholder="Subject *"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Your Message *"
                    name="message"
                    value={contactData.message}
                    onChange={handleOnChange}
                    rows="5"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  onClick={handleOnSubmit}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactdetails;