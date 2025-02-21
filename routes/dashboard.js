const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const Income = require('../models/Income');

// Get Budget List
router.get('/budgets', async (req, res) => {
  try {
    const budgets = await Budget.aggregate([
      {
        $lookup: {
          from: 'expenses',
          localField: '_id',
          foreignField: 'budgetId',
          as: 'expenses'
        }
      },
      {
        $addFields: {
          totalSpend: { $sum: '$expenses.amount' },
          totalItem: { $size: '$expenses' }
        }
      },
      { $sort: { _id: -1 } }
    ]);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Income List
router.get('/incomes', async (req, res) => {
  try {
    const incomes = await Income.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Expenses List
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ _id: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
