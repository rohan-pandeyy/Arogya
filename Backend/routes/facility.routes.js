const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const facilityController = require('../controllers/facility.controller'); // We will create this
const { protect, checkRoles } = require('../middlewares/auth.middleware');

const adminOnly = [protect, checkRoles(["admin"])];

/**
 * @route   POST /api/facilities
 * @desc    Create a new facility
 * @access  Admin
 */
router.post(
  '/',
  adminOnly,
  [
    body('name').notEmpty(),
    body('type').notEmpty(),
    body('address').notEmpty(),
    body('contactNumber').notEmpty(),
  ],
  facilityController.createFacility,
);

/**
 * @route   GET /api/facilities
 * @desc    Get all facilities
 * @access  Public (or Private, depending on requirements)
 */
router.get('/', facilityController.getAllFacilities);

/**
 * @route   GET /api/facilities/:id
 * @desc    Get a single facility with its doctors and staff
 * @access  Public (or Private)
 */
router.get('/:id', facilityController.getFacilityById);

/**
 * @route   PATCH /api/facilities/:id
 * @desc    Update a facility
 * @access  Admin
 */
router.patch('/:id', adminOnly, facilityController.updateFacility);

module.exports = router;
