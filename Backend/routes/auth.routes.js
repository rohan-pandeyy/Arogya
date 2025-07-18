const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller'); // We will create this controller
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with one or more roles
 * @access  Public
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('roles').isArray({ min: 1 }).withMessage('At least one role is required'),
  ],
  authController.register,
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  authController.login,
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (add token to blacklist)
 * @access  Private
 */
router.post('/logout', verifyToken, authController.logout);

module.exports = router;