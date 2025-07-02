import express from "express";
import authRouter from "./src/routes/authRouter.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
dotenv.config();

const App = express();
App.use(express.json());
App.use("/auth", authRouter);

App.get("/", (req, res) => {
  res.json({ message: "i am Backend" });
});

// const port = 2323;

const port = process.env.PORT || 2323;

App.listen(port,  () => {
  console.log(`http://localhost:${port}/register`);
    connectDB();
});
