const { Doctor } = require('../models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.registerDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      licenseNumber,
      email,
      password,
      name,
      specialization,
      yearOfStart,
      hospitalId,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({
      licenseNumber,
      email,
      password: hashedPassword,
      name,
      specialization,
      yearOfStart,
      hospitalId,
    });

    const token = newDoctor.generateAuthToken();
    res.status(201).json({
      doctor: {
        licenseNumber: newDoctor.licenseNumber,
        name: newDoctor.name,
        email: newDoctor.email,
        specialization: newDoctor.specialization,
        yearOfStart: newDoctor.yearOfStart,
        hospitalId: newDoctor.hospitalId,
      },
      token,
    });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ message: 'Error registering doctor' });
  }
};

exports.loginDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = doctor.generateAuthToken();

    res.status(200).json({
      doctor: {
        licenseNumber: doctor.licenseNumber,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        yearOfStart: doctor.yearOfStart,
        hospitalId: doctor.hospitalId,
      },
      token,
    });
  } catch (error) {
    console.error('Error logging in doctor:', error);
    res.status(500).json({ message: 'Error logging in doctor' });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

exports.getDoctorByLicenseNumber = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.licenseNumber);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Error fetching doctor' });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.licenseNumber);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.update(req.body);
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Error updating doctor' });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.licenseNumber);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.destroy();
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Error deleting doctor' });
  }
};
