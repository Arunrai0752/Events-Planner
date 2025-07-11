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
      enum: ["male", "female", "other", ""],
      default: "other",
    },
    representing: {
      type: String,
      default: "",
      enum: ["bride", "groom", "guest", "other", "N/A"],
    },
    occupaytion: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
      required: true,
    },

    city: {
      type: String,
      default: "",
      required: true,
    },
    state: {
      type: String,
      default: "",
      required: true,
    },
  },

  { timestamps: true }

);

const User = mongoose.model("User", userSchema);

export default User;
