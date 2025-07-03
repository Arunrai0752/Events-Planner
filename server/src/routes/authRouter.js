import express from "express";
 import { register, login ,logout } from "../controllers/authConntroller.js";
 import {A ,B ,C} from "../middlewares/authMiddleWare.js"

  const router = express.Router();


 router.post ("/register", A ,B , register)
 router.post ("/login", A, C, login)
 router.post ("/logout", B , A, logout)

 export default router;