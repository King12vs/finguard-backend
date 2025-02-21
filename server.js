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

// ✅ Use proper CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins (for testing)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(helmet());

// ✅ Add a simple API check route
app.get("/", (req, res) => {
  res.send("Finguard Backend is Running...");
});

// ✅ Route Middleware
app.use("/api/user/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);

// ✅ Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// ✅ Set PORT properly
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
