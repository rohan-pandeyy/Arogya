const { User } = require('../models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.getCurrentUser = async (req, res) => {
  try {
    const userData = req.user.toJSON();
    delete userData.password;
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Error fetching user info' });
  }
};

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, name, age, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      email,
      password, // Password will be hashed by the model hook
      name,
      age,
      gender,
    });

    // Generate token
    const token = user.generateAuthToken();

    // Return user data (excluding password)
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = user.generateAuthToken();

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return user data (excluding password)
    const userData = user.toJSON();
    delete userData.password;

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          association: 'primaryDoctor',
          attributes: ['id', 'name', 'specialization'],
        },
        {
          association: 'preferredHospitals',
          attributes: ['id', 'name', 'addressCity'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (token) {
      await BlacklistToken.create({ token });
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
};

module.exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { dob, address, phone, bloodGroup, diagnosis, allergies, age } =
      req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.dob = dob;
    user.address = address;
    user.phone = phone;
    user.bloodGroup = bloodGroup;
    user.diagnosis = diagnosis;
    user.allergies = allergies;
    if (age) user.age = age;

    await user.save();

    const updatedData = user.toJSON();
    delete updatedData.password;

    res.status(200).json({ message: 'Profile updated', user: updatedData });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
