import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profileRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(helmet());

// Configure CORS to allow your frontend origin
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If using cookies/sessions
  })
);

// Routes
app.use("/api/user/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
