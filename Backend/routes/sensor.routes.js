const express = require('express');
const router = express.Router();
const {
  logRealtimeData,
  logSessionSummary,
  getSessionRealtimeData,
  getSessionSummary,
} = require('../controllers/sensor.controller');
const {
  protect,
  checkRoles,
  authorizePhysioSessionAccess,
} = require('../middleware/auth.middleware');

// Log real-time sensor data (batch of frames)
router.post(
  '/realtime',
  protect,
  checkRoles(['doctor', 'staff']),
  authorizePhysioSessionAccess,
  logRealtimeData,
);

// Log session summary for a completed session
router.post(
  '/summary',
  protect,
  checkRoles(['doctor', 'staff']),
  authorizePhysioSessionAccess,
  logSessionSummary,
);

// Get all real-time sensor entries for a session
router.get(
  '/realtime/:session_id',
  protect,
  authorizePhysioSessionAccess,
  getSessionRealtimeData,
);

// Get the session summary log for a session
router.get(
  '/summary/:session_id',
  protect,
  authorizePhysioSessionAccess,
  getSessionSummary,
);

module.exports = router;
