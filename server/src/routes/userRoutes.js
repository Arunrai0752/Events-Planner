import express from "express";
import { GetProfile } from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleWare.js";


const router = express.Router();

router.get("/profile", Protect, GetProfile);


export default router;
