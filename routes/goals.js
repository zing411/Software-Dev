const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
  const goals = await Goal.find({ user: req.session.userId });
  res.render('goals/index', { goals });
});

router.get('/new', (req, res) => res.render('goals/new'));
router.post('/', async (req, res) => {
  await new Goal({ ...req.body, currentAmount: 0, user: req.session.userId }).save();
  res.redirect('/goals');
});

router.get('/:id/edit', async (req, res) => {
  const g = await Goal.findById(req.params.id);
  res.render('goals/edit', { goal: g });
});
router.post('/:id', async (req, res) => {
  await Goal.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/goals');
});
router.post('/:id/delete', async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.redirect('/goals');
});

module.exports = router;
