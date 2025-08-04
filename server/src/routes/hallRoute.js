import express from "express";
import { Protect } from "../middlewares/authMiddleWare.js";
import multer from "multer";
import { Addhall , getHalls} from "../controllers/hallController.js";

const upload = multer();
const router = express.Router();




router.post("/Add", Protect , Addhall );
router.get("/get", Protect , getHalls );



export default router;
