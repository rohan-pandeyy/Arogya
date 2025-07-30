const { validationResult } = require('express-validator');
const { User, Role, Patient, Doctor, Staff, BlacklistToken, sequelize } = require('../models');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, age, phone, gender, roles, patientProfile, doctorProfile, staffProfile } = req.body;

  const t = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await t.rollback();
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const newUser = await User.create({ email, password, name, age, phone, gender }, { transaction: t });

    const roleInstances = await Role.findAll({ where: { name: roles }, transaction: t });
    if (roleInstances.length !== roles.length) {
      await t.rollback();
      return res.status(400).json({ message: 'One or more provided roles are invalid.' });
    }

    await newUser.addRoles(roleInstances, { transaction: t });

    if (roles.includes('patient')) {
      await Patient.create({ id: newUser.id, ...patientProfile }, { transaction: t });
    }
    if (roles.includes('doctor')) {
      if (!doctorProfile || !doctorProfile.facilityId) {
        await t.rollback();
        return res.status(400).json({ message: 'Doctor profile with facilityId is required.' });
      }
      await Doctor.create({ id: newUser.id, ...doctorProfile }, { transaction: t });
    }
    if (roles.includes('staff')) {
      if (!staffProfile || !staffProfile.facilityId) {
        await t.rollback();
        return res.status(400).json({ message: 'Staff profile with facilityId is required.' });
      }
      await Staff.create({ id: newUser.id, ...staffProfile }, { transaction: t });
    }

    await t.commit();

    const token = newUser.generateAuthToken();
    const userResponse = newUser.toJSON();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    await t.rollback();
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal Server Error during registration.' });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = user.generateAuthToken();
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: userResponse, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    // ✅ FIX: Get the token from the cookie instead of the Authorization header.
    const token = req.cookies.token;

    if (token) {
      // Decode the token to get its expiration date for the blacklist
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        const expiresAt = new Date(decoded.exp * 1000);
        await BlacklistToken.create({ token, expiresAt });
      }
    }

    // ✅ FIX: Clear the cookie from the browser.
    res.clearCookie('token');

    res.status(200).json({ message: 'Successfully logged out.' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  logout,
};