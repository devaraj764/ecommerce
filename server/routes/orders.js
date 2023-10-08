const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController'); // Import your order controller

// Create a new order
router.get('/', OrderController.getOrdersByUserId);
router.post('/create-order', OrderController.createOrder);

module.exports = router;
