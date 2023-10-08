// controllers/userController.js
const User = require('../models/User'); // Replace with the actual path to your User model
const bcrypt = require('bcrypt');

// get user profile
exports.getProfile = async (req, res) => {
  try {
    // Respond with the user's profile data
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update user information
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;

    // Update the user's information in the database
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// update cart Item
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, quantity } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
        'cart._id': itemId,
      },
      {
        $set: {
          'cart.$.quantity': quantity,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      console.log(updatedUser)
      return res.status(404).json({ message: 'User or cart item not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// add address
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { address } = req.body; 
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: address } }, 
      { new: true }
    );

    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.userData.userId; // Extract user ID from the token
    const { currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash and update the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
