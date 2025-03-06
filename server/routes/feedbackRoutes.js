const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', auth, async (req, res) => {
    const { restaurant, message } = req.body;
    const newFeedback = new Feedback({ user: req.user._id, restaurant, message });
    await newFeedback.save();
    res.status(201).json(newFeedback);
});

// Get feedback for a restaurant
router.get('/:restaurantId', async (req, res) => {
    const feedback = await Feedback.find({ restaurant: req.params.restaurantId }).populate('user');
    res.json(feedback);
});

module.exports = router;