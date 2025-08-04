import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewBanquetModal = ({ hall, onClose }) => {
  if (!hall) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Banquet Hall Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Hall Name:</h3>
            <p>{hall.hallName}</p>
          </div>
          <div>
            <h3 className="font-semibold">Manager Name:</h3>
            <p>{hall.managerName}</p>
          </div>
          <div>
            <h3 className="font-semibold">Contact Number:</h3>
            <p>{hall.contactNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p>{hall.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Address:</h3>
            <p>{hall.address}</p>
          </div>
          <div>
            <h3 className="font-semibold">Capacity:</h3>
            <p>{hall.capacity}</p>
          </div>
          <div>
            <h3 className="font-semibold">Rent:</h3>
            <p>₹{hall.rent}</p>
          </div>
          <div>
            <h3 className="font-semibold">Minimum Booking Amount:</h3>
            <p>₹{hall.minBookingAmount}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold">Features:</h3>
          <p>{hall.featureDescription}</p>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold">Photos:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {hall.photos.map((photo, index) => (
              <img 
                key={index} 
                src={photo} 
                alt={`Hall ${index + 1}`} 
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBanquetModal;