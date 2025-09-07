import express from "express";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./lib/db.js";

const app = express();

connectToDatabase();

app.use(cors({ origin: process.env.WEBSITE_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/auth", authRouter);

app.listen(4000, () =>
  console.log("Server is running on http://localhost:4000")
);
