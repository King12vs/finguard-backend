import express from "express";
import { checkJwt } from "../config/auth.js";
import User from "../models/User.js"; // Ensure this model exists

const router = express.Router();

// ✅ Get User Profile
router.get("/", checkJwt, async (req, res) => {
  console.log("✅ Received request at /api/user/profile"); // Debugging log
  try {
    const userId = req.auth.payload.sub; 
    console.log("User ID:", userId); // Debugging log
    let user = await User.findOne({ auth0Id: userId });

    if (!user) {
      console.log("User not found, creating new one.");
      user = await User.create({ auth0Id: userId, name: req.auth.payload.name, avatar: req.auth.payload.picture });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});


// ✅ Update User Profile
router.put("/", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const { name, avatar } = req.body;

    const user = await User.findOneAndUpdate({ auth0Id: userId }, { name, avatar }, { new: true, upsert: true });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile", error });
  }
});

export default router;
