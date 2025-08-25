import React from "react";
import { IoClose } from "react-icons/io5";

const ViewBanquetModal = ({ hall, onClose }) => {
  if (!hall) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        
        <div className="flex justify-between items-center border-b px-5 py-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Banquet Hall Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Hall Name", value: hall.hallName },
              { label: "Manager Name", value: hall.managerName },
              { label: "Contact Number", value: hall.contactNumber },
              { label: "Email", value: hall.email },
              { label: "Address", value: hall.address },
              { label: "Capacity", value: hall.capacity },
              { label: "Rent", value: `₹${hall.rent}` },
              { label: "Minimum Booking Amount", value: `₹${hall.minBookingAmount}` },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-600">{item.label}:</h3>
                <p className="text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Features:</h3>
            <p className="text-gray-800">{hall.featureDescription}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Photos:</h3>
            {hall.photos?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {hall.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Hall ${index + 1}`}
                    className="w-28 h-28 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No photos available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBanquetModal;
