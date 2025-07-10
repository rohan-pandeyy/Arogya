const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const hospitalController = require('../controllers/hospital.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Validation middleware
const hospitalValidation = [
  body('name').notEmpty().withMessage('Hospital name is required'),
  body('addressStreet').notEmpty().withMessage('Street address is required'),
  body('addressCity').notEmpty().withMessage('City is required'),
  body('addressState').notEmpty().withMessage('State is required'),
  body('addressZip').notEmpty().withMessage('ZIP code is required'),
  body('addressCountry').notEmpty().withMessage('Country is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required'),
  body('email').isEmail().withMessage('Valid email is required'),
];

// Routes
router.get('/', hospitalController.getAllHospitals);
router.get('/:id', hospitalController.getHospitalById);
router.post('/', hospitalValidation, hospitalController.createHospital);
router.put(
  '/:id',
  authMiddleware.authUser,
  hospitalValidation,
  hospitalController.updateHospital,
);
router.delete(
  '/:id',
  authMiddleware.authUser,
  hospitalController.deleteHospital,
);

module.exports = router;
