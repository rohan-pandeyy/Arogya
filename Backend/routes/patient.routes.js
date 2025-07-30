const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @route   PATCH /api/patients/me
 * @desc    Update the current user's patient-specific profile
 * @access  Private
 */
router.patch('/me', verifyToken, patientController.updateCurrentPatientProfile);

module.exports = router;
