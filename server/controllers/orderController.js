// controllers/orderController.js
const Order = require('../models/Order'); // Import your Order model
const User = require('../models/User');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items, totalAmount, address, isPaid } = req.body;

        const order = new Order({
            items,
            user: userId,
            totalAmount,
            address,
            isPaid: isPaid ? true : false,
        });

        await order.save();
        await User.findByIdAndUpdate(userId, {
            cart: []
        })
        // Return the newly created order
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId }).sort({ updatedAt: -1 }).select('items totalAmount isPaid status address createdAt updatedAt').populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

