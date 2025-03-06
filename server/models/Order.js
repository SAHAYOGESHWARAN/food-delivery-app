const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{ type: Object, required: true }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);