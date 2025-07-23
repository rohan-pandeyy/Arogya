const { validationResult } = require('express-validator');
const { Facility, Doctor, Staff, User } = require('../models');

const createFacility = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newFacility = await Facility.create(req.body);
    res.status(201).json(newFacility);
  } catch (error) {
    // Handle potential unique constraint error on facility name
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(409)
        .json({ message: 'A facility with this name already exists.' });
    }
    console.error('Error creating facility:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json(facilities);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id, {
      include: [
        {
          model: Doctor,
          as: 'doctors',
          include: {
            model: User,
            attributes: ['id', 'name', 'email'], // Include doctor's base user info
          },
        },
        {
          model: Staff,
          as: 'staffMembers',
          include: {
            model: User,
            attributes: ['id', 'name', 'email'], // Include staff's base user info
          },
        },
      ],
    });

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found.' });
    }

    res.status(200).json(facility);
  } catch (error) {
    console.error('Error fetching facility by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateFacility = async (req, res) => {
  try {
    const [updateCount] = await Facility.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateCount === 0) {
      return res
        .status(404)
        .json({ message: 'Facility not found or no new data to update.' });
    }

    res.status(200).json({ message: 'Facility updated successfully.' });
  } catch (error) {
    console.error('Error updating facility:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
};
