import express from "express";
import { checkJwt } from "../config/auth.js";
import User from "../models/user.js"; // Ensure this model exists

const router = express.Router();

// ✅ Get User Profile
router.get("/", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub; // Get Auth0 user ID
    let user = await User.findOne({ auth0Id: userId });

    if (!user) {
      user = await User.create({ auth0Id: userId, name: req.auth.payload.name, avatar: req.auth.payload.picture });
    }

    res.json(user);
  } catch (error) {
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
