const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware'); 

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with one or more roles
 * @access  Public
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('roles')
      .isArray({ min: 1 })
      .withMessage('At least one role is required'),
    body('age') // This field is optional
      .optional()
      .isInt({ min: 0 })
      .withMessage('Age, if provided, must be a valid non-negative number'),
    body('phone') // This field is optional
      .optional()
      .isString()
      .withMessage('Phone, if provided, must be a valid phone number'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender, if provided, must be one of: male, female, other'),
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
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').exists().withMessage('Password is required'),
  ],
  authController.login,
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (add token to blacklist)
 * @access  Private
 */
router.post('/logout', protect, authController.logout);

module.exports = router;
