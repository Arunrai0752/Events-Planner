import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ViewBanquetModal from "./modals/ViewBanquetModal.jsx";
import EditBanquetModal from "./modals/EditBanquetModal.jsx";
import DeleteBanquetModal from "./modals/DeleteBanquetModal.jsx";
import AddBanquetModal from "./modals/AddBanquetModal.jsx";
import api from "../../config/api.jsx";
import toast from "react-hot-toast";

const BanquetHall = () => {
  const [banquetHalls, setBanquetHalls] = useState([]);
  const [addBanquetHallModel, setAddBanquetHallModel] = useState(false);
  const [viewBanquetHallModel, setViewBanquetHallModel] = useState(false);
  const [editBanquetHallModel, setEditBanquetHallModel] = useState(false);
  const [deleteBanquetHallModel, setDeleteBanquetHallModel] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  const fetchBanquetHalls = async () => {
    try {
      const res = await api.get("/hall/get");
      setBanquetHalls(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error fetching banquet halls");
    }
  };

  useEffect(() => {
    fetchBanquetHalls();
  }, []);

  const handleView = (hall) => {
    setSelectedHall(hall);
    setViewBanquetHallModel(true);
  };

  const handleEdit = (hall) => {
    setSelectedHall(hall);
    setEditBanquetHallModel(true);
  };

  const handleDelete = (hall) => {
    setSelectedHall(hall);
    setDeleteBanquetHallModel(true);
  };

  return (
    <>
      {/* Header + Add Button */}
      <div className="px-4 mt-3 flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-base-content">
          Banquet Halls
        </h2>
        <button
          className="border rounded px-4 flex gap-3 items-center text-lg border-success bg-success text-success-content hover:bg-transparent hover:text-success"
          onClick={() => setAddBanquetHallModel(true)}
        >
          <IoAddCircleOutline /> Add New Hall
        </button>
      </div>

      {/* Table */}
      <div className="m-3">
        <table className="min-w-full bg-base-100 rounded-lg p-2 shadow-base-300">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th className="py-3 px-4 text-left">Hall Name</th>
              <th className="py-3 px-4 text-left">Manager Name</th>
              <th className="py-3 px-4 text-left">Contact Number</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Rent</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="p-4">
            {banquetHalls.length > 0 ? (
              banquetHalls.map((hall) => (
                <tr
                  className="hover:bg-base-200 transition-colors"
                  key={hall._id}
                >
                  <td className="py-2 px-4">{hall.hallName}</td>
                  <td className="py-2 px-4">{hall.managerName}</td>
                  <td className="py-2 px-4">{hall.contactNumber}</td>
                  <td className="py-2 px-4">{hall.capacity}</td>
                  <td className="py-2 px-4">₹{hall.rent}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="text-info px-3 py-1 rounded hover:text-info-content"
                      onClick={() => handleView(hall)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-warning px-3 py-1 rounded hover:text-warning-content"
                      onClick={() => handleEdit(hall)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-error px-3 py-1 rounded hover:text-error-content"
                      onClick={() => handleDelete(hall)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-3 text-error font-medium"
                >
                  -- No Banquet Halls are available --
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {viewBanquetHallModel && (
        <ViewBanquetModal
          hall={selectedHall}
          onClose={() => setViewBanquetHallModel(false)}
        />
      )}

      {editBanquetHallModel && (
        <EditBanquetModal
          hall={selectedHall}
          onClose={() => setEditBanquetHallModel(false)}
        />
      )}

      {deleteBanquetHallModel && (
        <DeleteBanquetModal
          hall={selectedHall}
          onClose={() => setDeleteBanquetHallModel(false)}
        />
      )}

      {addBanquetHallModel && (
        <AddBanquetModal onClose={() => setAddBanquetHallModel(false)} />
      )}
    </>
  );
};

export default BanquetHall;
