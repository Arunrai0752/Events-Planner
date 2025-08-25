import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import {
  FaEye,
  FaEdit,
  FaSearch,
  FaFilter,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import ContactViewModal from "./modals/ContactViewModal.jsx";

const CustomerQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isContactViewModalOpen, setIsContactViewModalOpen] = useState(false);

  const fetchAllCoustomerQueries = async () => {
    try {
      setLoading(true);
      const res = await api.get("admin/contacts");
      toast.success(res.data.message);
      setQueries(res.data.data);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        color: "bg-warning text-warning-content border-warning",
        icon: FaClock,
      },
      Resolved: {
        color: "bg-success text-success-content border-success",
        icon: FaCheckCircle,
      },
      Rejected: {
        color: "bg-error text-error-content border-error",
        icon: FaExclamationCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        <IconComponent className="text-xs" />
        {status?.charAt(0).toUpperCase() + status?.slice(1).replace("_", " ")}
      </span>
    );
  };

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.phone?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || query.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewQuery = (query) => {
    setSelectedQuery(query);
    setIsContactViewModalOpen(true);
  };

  useEffect(() => {
    fetchAllCoustomerQueries();
  }, [isContactViewModalOpen]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-base-200 min-h-[87vh] p-6 overflow-y-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Customer Queries
          </h1>
          <p className="text-base-content/70">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-base-100 rounded-xl shadow border border-base-300 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-base-content/50" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-base-100 rounded-xl shadow border border-base-300 overflow-hidden">
          {filteredQueries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-200 border-b border-base-300">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-base-content">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-primary" />
                        Customer
                      </div>
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-base-content">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        Email
                      </div>
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-base-content">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-primary" />
                        Phone
                      </div>
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-base-content">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-base-content">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {filteredQueries.map((query, index) => (
                    <tr
                      key={index}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-content font-semibold">
                            {query.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-base-content">
                              {query.name}
                            </div>
                            <div className="text-sm text-base-content/70">
                              Customer
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base-content/80">
                        {query.email}
                      </td>
                      <td className="px-6 py-4 text-base-content/80">
                        {query.phone}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(query.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewQuery(query)}
                          className="px-3 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex gap-2 items-center"
                        >
                          <FaEye /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-3xl text-base-content/50" />
              </div>
              <h3 className="text-lg font-medium text-base-content mb-2">
                No Queries Found
              </h3>
              <p className="text-base-content/70">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No customer queries have been submitted yet"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ContactViewModal
        isOpen={isContactViewModalOpen}
        onClose={() => setIsContactViewModalOpen(false)}
        Query={selectedQuery}
      />
    </>
  );
};

export default CustomerQueries;
