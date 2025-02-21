import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profileRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js"; // ✅ Import service routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(helmet());

// ✅ Allow requests from your frontend (Update FRONTEND_URL in Railway)
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/user/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/services", serviceRoutes); // ✅ Add services route

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
