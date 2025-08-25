import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const EditBanquetModal = ({ hall, onClose }) => {
  const [formData, setFormData] = useState({
    hallName: "",
    address: "",
    capacity: "",
    managerName: "",
    photos: [],
    contactNumber: "",
    email: "",
    rent: "",
    minBookingAmount: "",
    featureDescription: ""
  });

  useEffect(() => {
    if (hall) {
      setFormData({
        hallName: hall.hallName || "",
        address: hall.address || "",
        capacity: hall.capacity || "",
        managerName: hall.managerName || "",
        photos: hall.photos || [],
        contactNumber: hall.contactNumber || "",
        email: hall.email || "",
        rent: hall.rent || "",
        minBookingAmount: hall.minBookingAmount || "",
        featureDescription: hall.featureDescription || ""
      });
    }
  }, [hall]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const photoUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...photoUrls]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API integration here later
    console.log("Updated hall:", formData);
    onClose();
  };

  if (!hall) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Edit Banquet Hall</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          
          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Hall Name", name: "hallName", type: "text" },
              { label: "Manager Name", name: "managerName", type: "text" },
              { label: "Contact Number", name: "contactNumber", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Address", name: "address", type: "text" },
              { label: "Capacity", name: "capacity", type: "number" },
              { label: "Rent (₹)", name: "rent", type: "number" },
              { label: "Minimum Booking Amount (₹)", name: "minBookingAmount", type: "number" },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Feature Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feature Description</label>
            <textarea
              name="featureDescription"
              value={formData.featureDescription}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                         file:rounded file:border-0 file:text-sm file:font-semibold 
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Hall ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedPhotos = formData.photos.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, photos: updatedPhotos }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditBanquetModal;
