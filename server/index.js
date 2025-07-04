import express from "express";
import AuthRouter from "./src/routes/AuthRouter.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { A, B, C } from "../server/src/middlewares/authMiddleWare.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use(A, B, C);
app.use("/auth", AuthRouter);


app.use((err, req, res, next) => {
  const errormessage = err.message || "Internal Server Error";
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({message:errormessage})
});

const port = process.env.PORT || 2323;

app.listen(port, () => {
  console.log(`http://localhost:${port}/register`);
  connectDB();
});
