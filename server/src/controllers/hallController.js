import Banquet from "../models/BanquetMondel.js";
import { v2  as cloudinary } from "cloudinary"

export const Addhall = async (req, res, next) => {
    const {
        hallName,
        address,
        capacity,
        managerName,
        contactNumber,
        email,
        rent,
        minBookingAmount,
        featureDescription,
    } = req.body;




    const photos = req.files; 





    const requiredFields = {
        hallName,
        address,
        capacity,
        managerName,
        photos,
        contactNumber,
        email,
        rent,
        minBookingAmount,
        featureDescription,
    };


    if (!hallName || !address || !capacity || !managerName || !photos || !contactNumber || !email || !rent || !minBookingAmount || !featureDescription) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }


    let pictures = [];

    if (photos && photos.length > 0) {

        await Promise.all(photos.map(async file => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype || 'image/jpeg'};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "banquet_halls",
                width: 500,
                height: 500,
                crop: "fill",
            });
            pictures.push(result.secure_url);
        }));


    }



    try {
        const existingHall = await Banquet.findOne({ hallName });
        if (existingHall) {
            return res
                .status(409)
                .json({ message: "Hall with this name already exists" });
        }

        const newHall = await Banquet.create({
            hallName,
            address,
            capacity: Number(capacity),
            managerName,
            photos: Array.isArray(pictures) ? pictures : [pictures],
            contactNumber,
            email,
            rent: Number(rent),
            minBookingAmount: Number(minBookingAmount),
            featureDescription,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            success: true,
            message: "Hall added successfully",
            data: {
                id: newHall._id,
                hallName: newHall.hallName,
                address: newHall.address,
                capacity: newHall.capacity,
            },
        });
    } catch (error) {
        console.error("Error adding banquet hall:", error);
        next(error);
    }
};

export const getHalls = async (req, res, next) => {
    try {
        const Halls = await Banquet.find({});
        res.status(200).json({ message: "All hall here", data: Halls });
    } catch (error) {
        next(error);
    }
};
