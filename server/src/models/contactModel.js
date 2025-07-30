import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
   {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Rejected"],
      default: "Pending",
      required: true,
    },
    reply: { type: String },
  },
  { timestamps: true }
);


const Public = mongoose.model("public", ContactSchema);
export default Public;