import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane,
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../config/api";
import toast from "react-hot-toast";

const ContactViewModal = ({ isOpen, onClose, Query }) => {
  const statusConfig = {
    Pending: {
      color: "bg-warning/20 text-warning border-warning/30",
      icon: FaClock,
      label: "🟡 Pending",
      bgColor: "bg-warning/10"
    },
    Resolved: {
      color: "bg-success/20 text-success border-success/30",
      icon: FaCheckCircle,
      label: "🟢 Resolved",
      bgColor: "bg-success/10"
    },
    Rejected: {
      color: "bg-error/20 text-error border-error/30",
      icon: FaExclamationCircle,
      label: "🔴 Rejected",
      bgColor: "bg-error/10"
    },
  };

  const [query, setQuery] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    status: "Pending",
    reply: "",
  });

  const [updateData, setUpdateData] = useState({
    status: "Pending",
    reply: "",
  });

  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (Query && isOpen) {
      setQuery(Query);
      setUpdateData({
        status: Query.status || "Pending",
        reply: Query.reply || "",
      });
      setIsModified(false);
    }
  }, [Query, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsModified(true);
  };

  const handleUpdateQuery = async () => {
    if (!updateData.reply.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(`/admin/contacts/${query._id}`, updateData);
      toast.success("Query updated successfully");
      setQuery(response.data);
      setIsModified(false);
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update query";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = statusConfig[query.status]?.icon || FaClock;
  const isPending = query.status === "Pending";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-base-100 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary to-secondary rounded-t-2xl p-6 text-primary-content">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-base-100/20 rounded-full flex items-center justify-center text-xl font-bold">
                    {query.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Support Ticket</h3>
                    <p className="text-base-100/80">
                      ID: {query._id?.slice(-6) || "N/A"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 flex items-center gap-2 ${
                      statusConfig[query.status]?.color || statusConfig.Pending.color
                    }`}
                  >
                    <StatusIcon />
                    {query.status}
                  </span>
                  <button
                    onClick={onClose}
                    className="text-base-100/80 hover:text-base-100 hover:bg-base-100/20 rounded-full p-2 transition-all"
                    aria-label="Close modal"
                  >
                    <IoMdCloseCircle className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    icon: <FaUser className="text-primary" />,
                    label: "Customer Name",
                    value: query.name || "Not provided",
                  },
                  {
                    icon: <FaEnvelope className="text-primary" />,
                    label: "Email Address",
                    value: query.email || "Not provided",
                  },
                  {
                    icon: <FaPhone className="text-primary" />,
                    label: "Phone Number",
                    value: query.phone || "Not provided",
                  },
                  {
                    icon: <FaTag className="text-primary" />,
                    label: "Subject",
                    value: query.subject || "No subject",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-base-200 rounded-xl p-4 border border-base-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-base-100 rounded-lg shadow-xs">
                        {item.icon}
                      </div>
                      <label className="text-sm font-semibold text-base-content/70">
                        {item.label}
                      </label>
                    </div>
                    <p className="text-base-content font-medium pl-11 break-all">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`mb-6 rounded-xl p-5 ${
                  statusConfig[query.status]?.bgColor || "bg-base-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-base-100 rounded-lg shadow-xs">
                    <FaEdit className="text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-base-content/70">
                    Customer Message
                  </h4>
                </div>
                <p className="text-base-content leading-relaxed whitespace-pre-line pl-11">
                  {query.message || "No message provided"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border-t-2 border-base-300 pt-6"
              >
                <h4 className="text-lg font-bold text-base-content mb-4 flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <FaEdit />
                  </div>
                  Admin Response
                </h4>

                <div className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-semibold text-base-content mb-2">
                      Update Status
                    </label>
                    <select
                      name="status"
                      value={updateData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-base-100 text-base-content"
                      disabled={!isPending || loading}
                    >
                      {Object.entries(statusConfig).map(([key, { label }]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-base-content mb-2">
                      Reply Message *
                    </label>
                    <textarea
                      name="reply"
                      value={updateData.reply}
                      onChange={handleInputChange}
                      placeholder="Write your response to the customer..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none bg-base-100 text-base-content"
                      disabled={!isPending || loading}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-3 pt-2"
                  >
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border-2 border-base-300 text-base-content rounded-xl hover:bg-base-200 transition-colors font-medium"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleUpdateQuery}
                      disabled={
                        loading ||
                        !updateData.reply.trim() ||
                        !isPending ||
                        !isModified
                      }
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-xl hover:from-primary-focus hover:to-secondary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-primary-content"
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