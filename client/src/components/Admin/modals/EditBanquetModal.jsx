import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

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
    // In a real app, you would handle file uploads here
    const files = Array.from(e.target.files);
    const photoUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...photoUrls]
    }));
  };






  const handleSubmit = (e) => {
    e.preventDefault();


  };

  if (!hall) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Banquet Hall</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Hall Name</label>
              <input
                type="text"
                name="hallName"
                value={formData.hallName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Manager Name</label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Capacity</label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rent (₹)</label>
              <input
                type="text"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Minimum Booking Amount (₹)</label>
              <input
                type="text"
                name="minBookingAmount"
                value={formData.minBookingAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Feature Description</label>
            <textarea
              name="featureDescription"
              value={formData.featureDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Photos</label>
            <input
              type="file"
              multiple
              onChange={handlePhotoChange}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Hall ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedPhotos = formData.photos.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, photos: updatedPhotos }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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