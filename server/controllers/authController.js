// controllers/authController.js
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: 'email already exists.' });
    }

    const newUser = new User({
      ...req.body,
    });

    await newUser.save();
    const token = await User.findWithCredentials(email, password)

    res.status(201).json({ message: 'User created successfully.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const token = await User.findWithCredentials(email, password);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message || 'Authentication failed.' });
  }
};