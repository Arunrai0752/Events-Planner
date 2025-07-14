import express from "express";
import { GetProfile, UpdateProfile} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleWare.js";
import multer from "multer";
import { Deactivateuser } from "../controllers/authConntroller.js";

const upload = multer();
const router = express.Router();




router.get("/profile", Protect, GetProfile);
router.put("/update", Protect, upload.single("picture"), UpdateProfile);
router.put("/deactivate", Protect, Deactivateuser);


export default router;
