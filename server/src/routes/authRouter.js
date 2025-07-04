import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/authConntroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update", updateUser);

export default router;
