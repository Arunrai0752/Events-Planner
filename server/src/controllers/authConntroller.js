import User from "../models/userModel.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    if (!firstname || !lastname || !email || !phonenumber || !password) {
      const error = new Error("All Fields Requeried");
      error.statusCode = 400;
      return next(error);
    }

    const hashedpass = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email pahle se Register Hai");
      error.statusCode = 400;
      return next(error);
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password:hashedpass,
    });
    res.status(201).json({ Message: "Registation Succecfull" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = (req, res) => {
  res.json({ message: "User Loged In Success" });
};

export const logoutUser = (req, res) => {
  res.json({ message: "User Loged Out Success" });
};

export const updateUser = (req, res) => {
  res.json({ message: "User update Out Success" });
};
