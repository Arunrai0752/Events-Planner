import express from "express";
import morgan from "morgan";
import AuthRouter from "./src/routes/AuthRouter.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);

app.use((err, req, res, next) => {
  const errormessage = err.message || "Internal Server Error";
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({ message: errormessage });
});

const port = process.env.PORT || 2323;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
  connectDB();
});
