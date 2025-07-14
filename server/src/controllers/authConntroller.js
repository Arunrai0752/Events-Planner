import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import gentoken from "../utils/auth.js";
import Deactivation from "../models/deactivationModel.js";

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


    const profilePic = `https://placehold.co/600x400?text=${firstname
      .charAt(0)
      .toUpperCase()}${lastname.charAt(0).toUpperCase()}`;

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedpass,
      photo: profilePic,
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

export const Deactivateuser = async (req, res, next,) => {

  try {
    const currentUser = req.user;
    const {password, reason ,feedback } = req.body;

    if(!currentUser){
      const error = new Error("USer NOt Found Login Again")
      error.statusCode = 401;
      return next(error);
    }

        const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        gender: "N/A",
        occupation: "N/A",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        district: "N/A",
        representing: "N/A",
        photo: "N/A",
        role: "N/A",
        password:"N/A",
        status: "Inactive",
      },
      { new: true }
    );

    LogoutUser();
    await Deactivation.create({ userId: currentUser._id, reason, feedback });
 res.status(200).json({ message: "Sorry to see you go . . ." });
  } catch (error) {
    next(error);
  }
};


export const LogoutUser = (req, res, next) => {
  try {
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};