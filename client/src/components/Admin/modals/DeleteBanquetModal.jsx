import React from "react";
import { FaTimes } from "react-icons/fa";

const DeleteBanquetModal = ({ hall, onClose }) => {



  const handleConfirmDelete = async (id) => {
    try {

      setBanquetHalls(prev => prev.filter(hall => hall._id !== id));
      onClose
    } catch (error) {
      console.error("Error deleting banquet hall:", error);
    }
  };

  if (!hall) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirm Deletion</h2>
         
        </div>

        <p className="mb-6">
          Are you sure you want to delete <strong>{hall.hallName}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirmDelete(hall._id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBanquetModal;