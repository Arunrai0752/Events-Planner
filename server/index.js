import express from "express";
import morgan from "morgan";
import AuthRouter from "./src/routes/authRouter.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoutes.js"
import cloudinary from "./src/config/cloudinary.js";
import PublicRouter from "./src/routes/PublicRouter.js"
import AdminRouter from "./src/routes/adminRouter.js"
import hallRouter from "./src/routes/hallRoute.js"

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/user", userRouter);
app.use("/public" , PublicRouter)
app.use("/admin" , AdminRouter)
app.use("/hall" , hallRouter)

app.use((err, req, res, next) => {
  const errormessage = err.message || "Internal Server Error";
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({ message: errormessage });
});

const port = process.env.PORT || 2323;

app.listen(port, async () => {
  console.log(`Server Started at ${port}`);

  try {
    await connectDB();
    await cloudinary.api.resources({ max_results: 1 })
    console.log("cloudinary bhi Connected");


  } catch (error) {
    console.log(error);
    process.exit(1);
    

  }
});
