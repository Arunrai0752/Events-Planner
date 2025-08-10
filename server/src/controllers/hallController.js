import Banquet from "../models/BanquetMondel.js";

export const Addhall = async (req, res, next) => {
    const {
        hallName,
        address,
        capacity,
        managerName,
        photos,
        contactNumber,
        email,
        rent,
        minBookingAmount,
        featureDescription
    } = req.body;

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
        featureDescription
    };





    try {
        const existingHall = await Banquet.findOne({ hallName });
        if (existingHall) {
            return res.status(409).json({ message: "Hall with this name already exists" });
        }

        const newHall = await Banquet.create({
            hallName,
            address,
            capacity: Number(capacity),
            managerName,
            photos: Array.isArray(photos) ? photos : [photos], // Ensure photos is an array
            contactNumber,
            email,
            rent: Number(rent),
            minBookingAmount: Number(minBookingAmount),
            featureDescription,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: "Hall added successfully",
            data: {
                id: newHall._id,
                hallName: newHall.hallName,
                address: newHall.address,
                capacity: newHall.capacity
            }
        });

    } catch (error) {
        console.error("Error adding banquet hall:", error);
        next(error);
    }




};

export const getHalls = async (req, res, next) => {
    try {
        const Halls = await Banquet.find({})
        res.status(200).json({ message: "All hall here", data: Halls });

    } catch (error) {
        next(error)

        
    }
}



