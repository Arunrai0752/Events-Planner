import React, { useEffect, useState } from "react";
// Icons import (Font Awesome se various icons)
import {
  FaClock,          // Pending status ke liye
  FaCheckCircle,    // Resolved status ke liye
  FaExclamationCircle, // Rejected status ke liye
  FaPaperPlane,     // Send button ke liye
  FaEdit,           // Edit/Response section ke liye
  FaUser,           // Customer name ke liye
  FaEnvelope,       // Email ke liye
  FaPhone,          // Phone ke liye
  FaTag             // Subject ke liye
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io"; // Modal close button ke liye
import { motion, AnimatePresence } from "framer-motion"; // Smooth animations ke liye
import api from "../../../config/api"; // Backend API calls ke liye
import toast from "react-hot-toast"; // User notifications ke liye

const ContactViewModal = ({ isOpen, onClose, Query }) => {
  /* 
    Status Configuration:
    Har status (Pending, Resolved, Rejected) ka design, color aur icon yahan define kiya gaya hai
  */
  const statusConfig = {
    Pending: {
      color: "bg-amber-100 text-amber-800 border-amber-200", // Yellow theme
      icon: FaClock, // Clock icon
      label: "🟡 Pending", // Label with emoji
      bgColor: "bg-amber-50" // Background color
    },
    Resolved: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-200", // Green theme
      icon: FaCheckCircle, // Checkmark icon
      label: "🟢 Resolved",
      bgColor: "bg-emerald-50"
    },
    Rejected: {
      color: "bg-rose-100 text-rose-800 border-rose-200", // Red theme
      icon: FaExclamationCircle, // Warning icon
      label: "🔴 Rejected",
      bgColor: "bg-rose-50"
    },
  };

  // Current query ka data store karne ke liye state
  const [query, setQuery] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    status: "Pending", // Default status
    reply: "",
  });

  // Admin jo changes karega usko store karne ke liye state
  const [updateData, setUpdateData] = useState({
    status: "Pending",
    reply: "",
  });

  const [loading, setLoading] = useState(false); // Loading spinner dikhane ke liye
  const [isModified, setIsModified] = useState(false); // Koi changes hua hai ya nahi check karne ke liye

  /* 
    useEffect Hook:
    Jab modal open hota hai ya Query prop change hota hai,
    tab current query ka data set karo
  */
  useEffect(() => {
    if (Query && isOpen) {
      setQuery(Query); // Prop se data state mein copy karo
      setUpdateData({
        status: Query.status || "Pending", // Existing status ya default
        reply: Query.reply || "", // Existing reply ya blank
      });
      setIsModified(false); // Changes nahi hue abhi
    }
  }, [Query, isOpen]);

  /* 
    Input Change Handler:
    Jab admin status ya reply change karta hai
  */
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Input ka name aur value nikalo
    setUpdateData((prev) => ({
      ...prev, // Purana data rakho
      [name]: value, // New value update karo
    }));
    setIsModified(true); // Changes ho gaye mark karo
  };

  /* 
    Update Query Function:
    Jab admin "Send Response" button click karta hai
  */
  const handleUpdateQuery = async () => {
    // Reply empty nahi hona chahiye
    if (!updateData.reply.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setLoading(true); // Loading spinner dikhao
    try {
      // Backend API call (PUT request)
      const response = await api.put(`/admin/contacts/${query._id}`, updateData);
      
      // Success case
      toast.success("Query updated successfully");
      setQuery(response.data); // New data se update karo
      setIsModified(false); // Changes reset karo
      onClose(); // Modal band karo
    } catch (error) {
      // Error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update query";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false); // Loading spinner band karo
    }
  };

  // Current status ka icon nikalne ke liye
  const StatusIcon = statusConfig[query.status]?.icon || FaClock;
  // Check karo ki status Pending hai ya nahi
  const isPending = query.status === "Pending";

  // Modal render nahi karo jab closed ho
  if (!isOpen) return null;

  return (
    /* 
      Modal Backdrop:
      Framer Motion se smooth animations
    */
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} // Shuru mein invisible
          animate={{ opacity: 1 }} // Animate to visible
          exit={{ opacity: 0 }}    // Band hote time fade out
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
        >
          {/* 
            Main Modal Container:
            Yahan se animation start hota hai (slide up)
          */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} // Thoda neeche se
            animate={{ y: 0, opacity: 1 }} // Upar aake visible
            exit={{ y: 20, opacity: 0 }}   // Neeche jake fade
            transition={{ type: "spring", damping: 25 }} // Spring animation
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh]  overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Modal ke andar click se band na ho
          >
            {/* 
              Modal Header:
              Gradient background ke saath
            */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl p-6 text-white">
              <div className="flex justify-between items-center">
                {/* Customer Info Section */}
                <div className="flex items-center gap-4">
                  {/* Customer ka avatar circle */}
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                    {query.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Support Ticket</h3>
                    <p className="text-indigo-100 opacity-90">
                      ID: {query._id?.slice(-6) || "N/A"} {/* Last 6 characters of ID */}
                    </p>
                  </div>
                </div>
                
                {/* Status aur Close Button */}
                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 flex items-center gap-2 ${
                      statusConfig[query.status]?.color || statusConfig.Pending.color
                    }`}
                  >
                    <StatusIcon />
                    {query.status}
                  </span>
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                    aria-label="Close modal"
                  >
                    <IoMdCloseCircle className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* 
              Modal Content Area:
              Yahan saara main content hai
            */}
            <div className="p-6">
              {/* 
                Customer Information Grid:
                2 columns (mobile pe 1 column)
              */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* 
                  Information Cards:
                  Har field ke liye alag card with icon
                */}
                {[
                  {
                    icon: <FaUser className="text-indigo-500" />,
                    label: "Customer Name",
                    value: query.name || "Not provided",
                  },
                  {
                    icon: <FaEnvelope className="text-indigo-500" />,
                    label: "Email Address",
                    value: query.email || "Not provided",
                  },
                  {
                    icon: <FaPhone className="text-indigo-500" />,
                    label: "Phone Number",
                    value: query.phone || "Not provided",
                  },
                  {
                    icon: <FaTag className="text-indigo-500" />,
                    label: "Subject",
                    value: query.subject || "No subject",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }} // Animation start
                    animate={{ opacity: 1, y: 0 }}  // Animation end
                    transition={{ delay: index * 0.1 }} // Stagger animation
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    {/* Card Content */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg shadow-xs">
                        {item.icon}
                      </div>
                      <label className="text-sm font-semibold text-gray-600">
                        {item.label}
                      </label>
                    </div>
                    <p className="text-gray-900 font-medium pl-11 break-all">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* 
                Customer Message Section:
                Status ke according background color
              */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`mb-6 rounded-xl p-5 ${
                  statusConfig[query.status]?.bgColor || "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg shadow-xs">
                    <FaEdit className="text-indigo-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-700">
                    Customer Message
                  </h4>
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line pl-11">
                  {query.message || "No message provided"}
                </p>
              </motion.div>

              {/* 
                Admin Response Section:
                Yahan admin response deta hai
              */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border-t-2 border-gray-100 pt-6"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <FaEdit />
                  </div>
                  Admin Response
                </h4>

                <div className="space-y-5">
                  {/* 
                    Status Select Dropdown:
                    Admin status change kar sakta hai
                  */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Update Status
                    </label>
                    <select
                      name="status"
                      value={updateData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjM1NjVmZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                      disabled={!isPending || loading}
                    >
                      {Object.entries(statusConfig).map(([key, { label }]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* 
                    Reply Textarea:
                    Admin yahan response likhta hai
                  */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reply Message *
                    </label>
                    <textarea
                      name="reply"
                      value={updateData.reply}
                      onChange={handleInputChange}
                      placeholder="Write your response to the customer..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                      disabled={!isPending || loading}
                    />
                  </motion.div>

                  {/* 
                    Action Buttons:
                    Cancel aur Send/Update buttons
                  */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-3 pt-2"
                  >
                    {/* Cancel Button */}
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    
                    {/* Send/Update Button */}
                    <button
                      onClick={handleUpdateQuery}
                      disabled={
                        loading ||
                        !updateData.reply.trim() ||
                        !isPending ||
                        !isModified
                      }
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          {/* Loading Spinner */}
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          {isPending ? "Send Response" : "Update Response"}
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactViewModal;