// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.put('/update', UserController.updateProfile);
router.put('/change-password', UserController.changePassword);
router.get('/profile', UserController.getProfile)
router.put('/update-cart-item', UserController.updateCartItem);
router.put('/add-address', UserController.addAddress);

// Add more update routes as needed (e.g., update email, update profile picture, etc.)
module.exports = router;
