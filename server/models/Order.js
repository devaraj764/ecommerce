const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        Set: (value) => mongoose.Types.ObjectId(value)
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['placed', 'shipped', 'out', 'delivered'],
        default: 'placed'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.addresses', // Reference to the Address schema within the User model
        required: true,
        Set: (value) => mongoose.Types.ObjectId(value)
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
