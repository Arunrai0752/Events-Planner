import dotenv from "dotenv"
dotenv.config();

import ConnectDB from "../config/db.js"
import bcrypt from "bcrypt";
import User from "../models/userModel.js"

const seedAdmin = async () => {

    await ConnectDB();

    const adminPassword = await bcrypt.hash("Admin@0987", 10);

    const AdminUser = {

        firstname: "Arun",
        lastname: "Rai",
        email: "admin@shaadiwala.com",
        phonenumber: "9876543210",
        password: "secureAdminPass123",
        photo: "", 
        gender: "Male",
        representing: "N/A",
        occupation: "Administrator",
        address: "ShaadiWala HQ, 3rd Floor, IT Park",
        city: "Bhopal",
        state: "Madhya Pradesh",
        district: "Bhopal",
        status: "Active",
        role: "Admin"
    }

    
}