const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const all = await Transaction.find({ user: req.session.userId });
  res.render('transactions/index', { transactions: all });
});

router.get('/new', (req, res) => res.render('transactions/new'));
router.post('/', async (req, res) => {
  await new Transaction({ ...req.body, user: req.session.userId }).save();
  res.redirect('/transactions');
});

router.get('/:id/edit', async (req, res) => {
  const t = await Transaction.findById(req.params.id);
  res.render('transactions/edit', { transaction: t });
});
router.post('/:id', async (req, res) => {
  await Transaction.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/transactions');
});
router.post('/:id/delete', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect('/transactions');
});

module.exports = router;
