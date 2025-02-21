import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import userRoutes from "./routes/profileRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use("/api/user/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
