const Product = require('../models/Product');
const User = require('../models/User');

// Controller methods for product routes
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const pageSize = parseInt(req.query._limit) || 10; // Default page size is 10
    const brands = req.query?.brands?.split(',')
    const genders = req.query?.genders?.split(',')
    const priceRange = req.query?.priceRange?.split(',')
    const sortBy = req.query?.sortBy;
    const search = req.query?.search || '';

    const skip = (page - 1) * pageSize;
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);

    const query = Product.find({ name: { $regex: new RegExp(search, 'i') } });
    query.skip(skip);
    query.limit(pageSize);
    if (brands && brands.length > 0) {
      query.where('brand').in(brands)
    }
    if (genders && genders.length > 0) {
      query.where('gender').in(genders)
    }
    if (priceRange) {
      query.where('price').gte(priceRange[0])
      query.where('price').lte(priceRange[1])
    }
    if (sortBy === 'newlyadded') {
      query.sort({ updatedAt: -1 })
    }
    if (sortBy === 'mostrated') {
      query.sort({ rating: -1 })
    }

    const products = await query.exec();
    res.json({
      products,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getWishlistProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('wishlist').populate('wishlist');
    res.send(user.wishlist)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('cart').populate('cart.product');
    res.send(user.cart)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};