import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import api from "../../../config/api";
import toast from "react-hot-toast";

const AddBanquetModal = ({ onClose }) => {
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

  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const images = Array.from(e.target.files);

    if (images.length + formData.photos.length > 10) {
      toast.error("You can upload a maximum of 10 photos");
      return;
    }

    const validImages = images.filter((image) => {
      if (!image.type.match("image.*")) {
        toast.error(`${image.name} is not an image file`);
        return false;
      }
      if (image.size > 5 * 1024 * 1024) {
        toast.error(`${image.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    const newPreviews = validImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...validImages]
    }));
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photoPreviews[index]);
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photos") formDataToSend.append(key, value);
      });

      formData.photos.forEach((file) => {
        formDataToSend.append("photos", file);
      });

      await api.post("/hall/Add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Hall added successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding banquet hall");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold">Add New Banquet Hall</h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hall Name */}
            <div>
              <label className="label">
                <span className="label-text">Hall Name*</span>
              </label>
              <input
                type="text"
                name="hallName"
                value={formData.hallName}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text">Address*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="label">
                <span className="label-text">Capacity*</span>
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Manager Name */}
            <div>
              <label className="label">
                <span className="label-text">Manager Name*</span>
              </label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="label">
                <span className="label-text">Contact Number*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Rent */}
            <div>
              <label className="label">
                <span className="label-text">Rent (₹)*</span>
              </label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Min Booking Amount */}
            <div>
              <label className="label">
                <span className="label-text">Min Booking Amount (₹)*</span>
              </label>
              <input
                type="number"
                name="minBookingAmount"
                value={formData.minBookingAmount}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="label">
              <span className="label-text">Photos (Max 10)</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="btn btn-xs btn-error absolute -top-2 -right-2 rounded-full"
                  >
                    <IoClose size={12} />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              onChange={handlePhotoChange}
              multiple
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload JPG/PNG (max 5MB each)
            </p>
          </div>

          {/* Feature Description */}
          <div>
            <label className="label">
              <span className="label-text">Feature Description*</span>
            </label>
            <textarea
              name="featureDescription"
              value={formData.featureDescription}
              onChange={handleInputChange}
              required
              rows={3}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Footer Actions */}
          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting && "loading"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Banquet Hall"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanquetModal;
