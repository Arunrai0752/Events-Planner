import express from "express";
import { Protect  , isAdmin} from "../middlewares/authMiddleWare.js";
import multer from "multer";
import { Addhall , getHalls} from "../controllers/hallController.js";

const upload = multer();
const router = express.Router();




router.post("/Add", Protect ,isAdmin , Addhall );
router.get("/get", Protect ,isAdmin ,  getHalls );



export default router;
