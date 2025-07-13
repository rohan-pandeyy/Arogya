const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const doctorController = require('../controllers/doctor.controller');
const { authUser } = require('../middlewares/auth.middleware');

// Register Doctor
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('name')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),
    body('licenseNumber').notEmpty().withMessage('License number is required'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    body('yearOfStart')
      .isInt({ min: 1950, max: new Date().getFullYear() })
      .withMessage('Valid year of start is required'),
    body('hospitalId')
      .isInt()
      .withMessage('Hospital ID must be a valid number'),
  ],
  doctorController.registerDoctor,
);

// Login Doctor
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  doctorController.loginDoctor,
);

router.get('/', doctorController.getAllDoctors);
router.get('/:licenseNumber', doctorController.getDoctorByLicenseNumber);
router.put('/:licenseNumber', authUser, doctorController.updateDoctor);
router.delete('/:licenseNumber', authUser, doctorController.deleteDoctor);

module.exports = router;
