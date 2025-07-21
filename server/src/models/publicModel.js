import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },


},

    { timestamp: true })

const Public = mongoose.model("public", ContactSchema);
export default Public;