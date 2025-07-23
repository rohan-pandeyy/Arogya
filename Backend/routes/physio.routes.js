const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessionById,
  getPatientSessions,
  getDoctorSessions,
  deleteSession,
} = require('../controllers/physio.controller');
const { protect, checkRoles } = require('../middlewares/auth.middleware');

/**
 * @desc    Physiotherapy Session Routes
 * @route   /api/physio
 */

// POST /api/physio
// Create a new physiotherapy session
router
  .route('/')
  .post(protect, checkRoles('patient', 'doctor', 'admin'), createSession);

// GET /api/physio/patient/sessions
// Get all sessions for the currently logged-in patient
router
  .route('/patient/sessions')
  .get(protect, checkRoles('patient'), getPatientSessions);

// GET /api/physio/doctor/:doctorId
// Get all sessions for a specific doctor by their ID
router
  .route('/doctor/:doctorId')
  .get(protect, checkRoles('doctor', 'admin'), getDoctorSessions);

// GET, PUT, DELETE /api/physio/:id
// Get, update, or delete a single session by its ID
router
  .route('/:id')
  .get(protect, getSessionById) // Authorization is handled within the controller
  .delete(protect, checkRoles('doctor', 'admin'), deleteSession);

module.exports = router;
