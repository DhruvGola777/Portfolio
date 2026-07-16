const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const auth = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../config/cache');

// @route   GET /api/experience
// @desc    Get all experience (Public)
router.get('/', cacheMiddleware(), async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/experience
// @desc    Add experience (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const experience = await newExperience.save();
    clearCache('/api/experience');
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/experience/:id
// @desc    Update experience (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ msg: 'Experience not found' });

    experience = await Experience.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    clearCache('/api/experience');
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/experience/:id
// @desc    Delete experience (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    clearCache('/api/experience');
    res.json({ msg: 'Experience removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
