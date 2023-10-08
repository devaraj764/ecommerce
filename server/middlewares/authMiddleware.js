// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.secretKey);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    // console.log(error)
    return res.status(401).json({ message: 'Authentication failed.' });
  }
};
