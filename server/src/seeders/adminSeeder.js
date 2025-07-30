import dotenv from "dotenv"
dotenv.config();

import ConnectDB from "../config/db.js"
import bcrypt from "bcrypt";
import User from "../models/userModel.js"

const seedAdmin = async () => {
    console.log("Starting admin seeder...");

    await ConnectDB();

    const adminPassword = await bcrypt.hash("Admin@0987", 10);

    const AdminUser = {

        firstname: "Arun",
        lastname: "Rai",
        email: "admin@shaadiwala.com",
        phonenumber: "9876543210",
        password: adminPassword,
        photo: "https://placehold.co/600x400?text=A",
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


    const existingAdmin = await User.findOne({ role: "Admin" });

    let admin;
    if (existingAdmin) {
        admin = await User.findByIdAndUpdate(existingAdmin._id, AdminUser, {
            new: true,
        });
        console.log("Admin User Updated Successfully", admin.email);
    } else {
        admin = await User.create(AdminUser);
        console.log("Admin User Created Successfully", admin.email);
    }

    process.exit(1);

    

}

seedAdmin();