const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a task
router.post('/', async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Update a task
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
  res.json(task);
});

module.exports = router;
