const { User, Patient, Doctor, Staff, Role, Facility, sequelize } = require('../models');

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRoles = req.user.Roles.map((role) => role.name);

    const includeProfiles = [];
    if (userRoles.includes('patient')) {
      includeProfiles.push({ model: Patient });
    }
    if (userRoles.includes('doctor')) {
      includeProfiles.push({
        model: Doctor,
        include: [{ model: Facility, as: 'facility' }],
      });
    }
    if (userRoles.includes('staff')) {
      includeProfiles.push({
        model: Staff,
        include: [{ model: Facility, as: 'facility' }],
      });
    }

    const fullUserProfile = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          attributes: ['name'],
          through: { attributes: [] },
        },
        ...includeProfiles,
      ],
    });

    res.status(200).json(fullUserProfile);
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const { name, age, gender, phone } = req.body;
    const allowedUpdates = { name, age, gender, phone };

    Object.keys(allowedUpdates).forEach(
      (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key],
    );

    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    const [updateCount] = await User.update(allowedUpdates, {
      where: { id: req.user.id },
    });

    if (updateCount === 0) {
      return res.status(404).json({ message: 'User not found or no new data to update.' });
    }

    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const becomePatient = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const userRoles = user.Roles.map((role) => role.name);

    if (userRoles.includes('patient')) {
      await t.rollback();
      return res.status(409).json({ message: 'User is already registered as a patient.' });
    }

    // Find the 'patient' role
    const patientRole = await Role.findOne({ where: { name: 'patient' }, transaction: t });
    if (!patientRole) {
      await t.rollback();
      return res.status(500).json({ message: 'Patient role not found in system.' });
    }

    // Associate user with the role and create the patient profile
    await user.addRole(patientRole, { transaction: t });
    await Patient.create({ id: user.id, ...req.body }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Successfully registered as a patient.' });
  } catch (error) {
    await t.rollback();
    console.error('Error in becomePatient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  becomePatient,
};