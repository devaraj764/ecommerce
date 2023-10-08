const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Product',
    require: true,
    Set: function (value) {
      if (typeof value === 'string') {
        this._product = mongoose.Types.ObjectId(value);
      } else {
        this._product = value;
      }
    },
  },
  quantity: Number,
});

const addressSchema = new mongoose.Schema({
  address1: { type: String, required: true },
  address2: String,
  name: { type: String, required: true },
  pincode: { type: Number, required: true },
  mobile: { type: String, required: true }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  imageUrl: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    Set: function (productIds) {
      if (!Array.isArray(productIds)) {
        productIds = [productIds];
      }
      return productIds.map((productId) => mongoose.Types.ObjectId(productId));
    },
  }],
  addresses: [addressSchema],
  cart: [cartSchema],
}, { timestamps: true });

// Add a pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Custom method to find a user by email and verify the password
userSchema.statics.findWithCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  console.log(isPasswordValid)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate a token and return it
  const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '30d' });
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
