const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
    const { user, restaurant, rating, comment } = req.body;
    const newReview = new Review({ user, restaurant, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
});

// Get reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
    const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate('user');
    res.json(reviews);
});

module.exports = router;