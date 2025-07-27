const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 },
});

module.exports = mongoose.model('Goal', GoalSchema);
