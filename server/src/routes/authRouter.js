import express from "express";
import {
  registerUser,
  loginUser,
  LogoutUser,
} from "../controllers/authConntroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", LogoutUser);
// router.put("/update", updateUser);

export default router;
