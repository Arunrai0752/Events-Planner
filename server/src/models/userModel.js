import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "N/A"],
      required: true,
      default: "N/A",

    },
    representing: {
      type: String,
      default: "N/A",
      enum: ["bride", "groom", "guest", "other", "N/A"],
    },
    occupation: {
      type: String,
      default: "N/A",
    },
    address: {
      type: String,
      default: "N/A",
      required: true,
    },

    city: {
      type: String,
      default: "N/A",
      required: true,
    },
    state: {
      type: String,
      default: "N/A",
      required: true,
    },
    district: {
      type: String,
      default: "N/A",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

  },

  { timestamps: true }

);

const User = mongoose.model("User", userSchema);

export default User;
