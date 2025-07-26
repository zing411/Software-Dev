const express = require('express');
const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  const tx = await Transaction.find({ user: userId });
  const goals = await Goal.find({ user: userId });
  const income = tx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = tx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  res.render('dashboard', { income, expenses, balance, transactions: tx, goals });
});

module.exports = router;
