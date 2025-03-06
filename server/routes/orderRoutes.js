const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    const { user, restaurant, items, totalAmount } = req.body;
    const newOrder = new Order({ user, restaurant, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
});

// Get orders for a user
router.get('/:userId', async (req, res) => {
    const orders = await Order.find({ user: req.params.userId }).populate('restaurant');
    res.json(orders);
});

module.exports = router;