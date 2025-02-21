import express from "express";

const router = express.Router();

// Dummy services data (Replace with a database later)
router.get("/", async (req, res) => {
  try {
    const services = [
      { id: 1, name: "Budget Analysis", description: "Detailed budget tracking." },
      { id: 2, name: "Expense Tracking", description: "Monitor daily expenses." },
    ];
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

export default router;
