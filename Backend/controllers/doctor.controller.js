const { Doctor } = require("../models");
const { validationResult } = require("express-validator");

module.exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Error creating doctor" });
  }
};
