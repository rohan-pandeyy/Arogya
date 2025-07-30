const { Patient } = require('../models');

/**
 * Updates the patient-specific profile for the currently logged-in user.
 */
const updateCurrentPatientProfile = async (req, res) => {
  try {
    // Whitelist fields that can be updated on the Patient model
    const { address, bloodGroup, diagonosis, allergies } = req.body;
    const patientUpdates = { address, bloodGroup, diagonosis, allergies };

    // Remove any undefined fields so we don't nullify existing data
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
      // This might happen if the user is not a patient yet.
      // The frontend should ideally guide them to become a patient first.
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