const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/otp');

// Register user
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ name, email, password: hashedPassword, phone });
    await newUser .save();
    res.status(201).json({ message: 'User  registered successfully' });
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
    res.json({ token });
});

// Request OTP
router.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    await sendOTP(email, otp);
    // Store OTP in the database or in-memory store for verification
    res.json({ message: 'OTP sent to your email' });
});


// Update user profile
router.put('/profile', async (req, res) => {
    const { userId, name, email, phone } = req.body;
    const updatedUser  = await User.findByIdAndUpdate(userId, { name, email, phone }, { new: true });
    res.json(updatedUser );
});

// Update user preferences
router.put('/preferences', auth, async (req, res) => {
    const { preferences } = req.body;
    const updatedUser  = await User.findByIdAndUpdate(req.user._id, { preferences }, { new: true });
    res.json(updatedUser );
});

// Update user favorites
router.put('/favorites', auth, async (req, res) => {
    const { restaurantId } = req.body;
    const user = await User.findById(req.user._id);
    if (user.favorites.includes(restaurantId)) {
        user.favorites = user.favorites.filter(id => id !== restaurantId); // Remove from favorites
    } else {
        user.favorites.push(restaurantId); // Add to favorites
    }
    await user.save();
    res.json(user);
});

// Verify email
router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(400).send('Invalid token');
    }
    user.isVerified = true;
    await user.save();
    res.send('Email verified successfully');
});

module.exports = router;