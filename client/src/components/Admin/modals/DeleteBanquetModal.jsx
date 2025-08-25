import React from "react";
import { FaTimes } from "react-icons/fa";

const DeleteBanquetModal = ({ hall, onClose, onConfirm }) => {
  const handleConfirmDelete = async () => {
    try {
      // Call the onConfirm prop passed from parent component
      await onConfirm(hall._id);
      onClose();
    } catch (error) {
      console.error("Error deleting banquet hall:", error);
    }
  };

  if (!hall) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md shadow-xl border border-base-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-base-content">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-base-content/70 hover:text-base-content rounded-full p-1 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <p className="mb-6 text-base-content/80">
          Are you sure you want to delete <strong className="text-base-content">{hall.hallName}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-base-300 text-base-content rounded-lg hover:bg-base-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-error text-error-content rounded-lg hover:bg-error-focus transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBanquetModal;