// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define product routes
router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.get('/wishlist-items', authMiddleware, productController.getWishlistProducts);
router.get('/cart-items', authMiddleware, productController.getCartItems);
router.get('/:id', authMiddleware, productController.getProductById);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
