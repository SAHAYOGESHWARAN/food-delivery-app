const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { auth, admin } = require('../middleware/auth');


// Add a new restaurant
router.post('/restaurants', async (req, res) => {
    const { name, menu, location } = req.body;
    const newRestaurant = new Restaurant({ name, menu, location });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
});

// Get all restaurants
router.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Search restaurants
router.get('/search', async (req, res) => {
    const { query } = req.query;
    const restaurants = await Restaurant.find({ name: { $regex: query, $options: 'i' } });
    res.json(restaurants);
});

router.post('/restaurants', auth, admin, async (req, res) => {
    const { name, menu, location } = req.body;
    const newRestaurant = new Restaurant({ name, menu, location });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
});

module.exports = router;