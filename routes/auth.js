const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.redirect('/auth/login');
});

router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await bcrypt.compare(password, u.password))) {
    return res.redirect('/auth/login');
  }
  req.session.userId = u._id;
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
});

module.exports = router;
