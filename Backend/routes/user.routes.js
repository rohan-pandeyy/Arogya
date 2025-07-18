const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @route   GET /api/users/me
 * @desc    Get current user's complete profile (base + role-specific info)
 * @access  Private
 */
router.get('/me', verifyToken, userController.getCurrentUser);

/**
 * @route   PATCH /api/users/me
 * @desc    Update the current user's base profile (name, age, etc.)
 * @access  Private
 */
router.patch('/me', verifyToken, userController.updateCurrentUser);

/**
 * @route   POST /api/users/become-patient
 * @desc    Adds the 'patient' role and profile to the currently logged-in user
 * @access  Private
 */
router.post('/become-patient', verifyToken, userController.becomePatient);

module.exports = router;
