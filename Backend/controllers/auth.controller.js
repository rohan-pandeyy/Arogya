const { validationResult } = require('express-validator');
const { User, Role, Patient, Doctor, Staff, BlacklistToken, sequelize } = require('../models');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, roles, patientProfile, doctorProfile, staffProfile } = req.body;

  // Use a transaction to ensure all or nothing is written to the DB
  const t = await sequelize.transaction();

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await t.rollback();
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // 2. Create the base user
    const newUser = await User.create({ email, password, name }, { transaction: t });

    // 3. Find the role models from the database
    const roleInstances = await Role.findAll({ where: { name: roles }, transaction: t });
    if (roleInstances.length !== roles.length) {
      await t.rollback();
      return res.status(400).json({ message: 'One or more provided roles are invalid.' });
    }

    // 4. Associate user with roles
    await newUser.addRoles(roleInstances, { transaction: t });

    // 5. Create role-specific profiles
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

    // If everything is successful, commit the transaction
    await t.commit();

    // 6. Generate token and send response
    const token = newUser.generateAuthToken();
    const userResponse = newUser.toJSON();
    delete userResponse.password; // Ensure password hash is not sent

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

    res.status(200).json({ user: userResponse, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      // Set an expiration for the blacklisted token to prevent the table from growing indefinitely
      const decoded = require('jsonwebtoken').decode(token);
      const expiresAt = new Date(decoded.exp * 1000);

      await BlacklistToken.create({ token, expiresAt });
      res.status(200).json({ message: 'Successfully logged out.' });
    } else {
      res.status(400).json({ message: 'No token provided to blacklist.' });
    }
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