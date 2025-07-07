import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import gentoken from "../utils/auth.js";

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
      password: hashedpass,
    });
    res.status(201).json({ message: "Registation Succecfull" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Fields Required");
      error.statusCode = 409;
      return next(error);
    }
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not registered");
      error.statusCode = 408;
      return next(error);
    }
    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    gentoken(user._id, res);

    res.status(200).json({
      message: `WelcomeBack ${user.firstname} ${user.lastname}`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {};

export const updateUser = (req, res) => {};
