const { Patient } = require('../models');

const updateCurrentPatientProfile = async (req, res) => {
  try {
    const { address, bloodGroup, diagonosis, allergies } = req.body;
    const patientUpdates = { address, bloodGroup, diagonosis, allergies };

    Object.keys(patientUpdates).forEach(
      (key) => patientUpdates[key] === undefined && delete patientUpdates[key],
    );

    if (Object.keys(patientUpdates).length === 0) {
      return res.status(400).json({ message: 'No valid patient fields provided for update.' });
    }

    const [updateCount] = await Patient.update(patientUpdates, {
      where: { id: req.user.id },
    });

    if (updateCount === 0) {
      return res.status(404).json({ message: 'Patient profile not found or no new data to update.' });
    }

    res.status(200).json({ message: 'Patient profile updated successfully.' });
  } catch (error) {
    console.error('Error updating patient profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateCurrentPatientProfile,
};