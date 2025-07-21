import Public from "../models/publicModel.js"

export const ContactForm = async (req, res, next) => {

    const { name, email, budget, message } = req.body;


    if (!name || !email || !budget || !message) {
        const error = new Error("All Fields Requeried");
        error.statusCode = 400;
        return next(error);
    }
    const Contactform = await Public.create({
        name, email, budget, message,
    })

    
    res.status(200).json({
      message: `Contactform Submit SuccessFully`,
      data: Contactform,
    });

}