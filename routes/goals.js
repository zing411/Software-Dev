const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
  const goals = await Goal.find({ user: req.session.userId });
  res.render('goals/index', { goals });
});

router.get('/search', async (req, res) => {

  const {name, minTarAmount, maxTarAmount, minProgress, maxProgress} = req.query;

  const query ={
    user: req.session.userId,
  }
  if (name) query.name = name;
  if(minTarAmount || maxTarAmount){
    query.targetAmount = {};

    if (minTarAmount) query.targetAmount.$gte = Number(minTarAmount)
    if (maxTarAmount) query.targetAmount.$lte = Number(maxTarAmount)
  }

  if(minProgress || maxProgress){
    query.progress = {};

    if (minProgress) query.progress.$gte = Number(minProgress)
    if (maxProgress) query.progress.$lte = Number(maxProgress)
  }

  const filteredSearch = await Goal.find(query);
  res.render('goals/index', { goals: filteredSearch });
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

router.get('/goals/add', async (req, res) =>{
  const goals = await Goal.find({ user: req.session.userId });
  res.render('goals/add', {goals: goals})
})
router.post('/', async (req, res) =>{
  const goal = await Goal.findById(req.params.id);
  const givenAmount = req.body.amount;

  updatedGoal ={
    currentAmount: goal.currentAmount + givenAmount,
    progress: ((goal.currentAmount + givenAmount) / goal.targetAmount) * 100
  }

  await Goal.findByIdAndUpdate(req.params.id, updatedGoal);
  
  res.redirect('')
})

module.exports = router;
