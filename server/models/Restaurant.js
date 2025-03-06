const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    menu: [{ type: Object, required: true }], 
    location: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);