const { Hospital, Doctor } = require("../models");
const { validationResult } = require("express-validator");

// Get all hospitals
module.exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.findAll({
      include: [
        {
          model: Doctor,
          attributes: ["id", "name", "specialization"],
        },
      ],
    });
    res.status(200).json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

// Get single hospital by ID
module.exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id, {
      include: [
        {
          model: Doctor,
          attributes: ["id", "name", "specialization"],
        },
      ],
    });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json(hospital);
  } catch (error) {
    console.error("Error fetching hospital:", error);
    res.status(500).json({ message: "Error fetching hospital" });
  }
};

// Create new hospital
module.exports.createHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressCountry,
      contactNumber,
      email,
    } = req.body;

    const hospital = await Hospital.create({
      name,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressCountry,
      contactNumber,
      email,
    });

    res.status(201).json(hospital);
  } catch (error) {
    console.error("Error creating hospital:", error);
    res.status(500).json({ message: "Error creating hospital" });
  }
};

// Update hospital
module.exports.updateHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    await hospital.update(req.body);
    res.status(200).json(hospital);
  } catch (error) {
    console.error("Error updating hospital:", error);
    res.status(500).json({ message: "Error updating hospital" });
  }
};

// Delete hospital
module.exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    await hospital.destroy();
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    res.status(500).json({ message: "Error deleting hospital" });
  }
};
