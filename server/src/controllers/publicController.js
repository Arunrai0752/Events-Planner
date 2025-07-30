import Public from "../models/contactModel.js";

export const ContactForm = async (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        return next(error);
    }

    try {
        const contactForm = await Public.create({
            name,
            email,
            phone,
            subject,
            message,
           
        });

        res.status(200).json({
            success: true,
            message: "Contact form submitted successfully",
            data: contactForm,
        });

    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
};