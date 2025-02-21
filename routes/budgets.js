const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Check User Budgets
router.get('/check-user-budgets', async (req, res) => {
  const { email } = req.query;
  try {
    const budgets = await Budget.find({ createdBy: email });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
