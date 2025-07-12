const User = require('./user.model');
const Doctor = require('./doctor.model');
const Hospital = require('./hospital.model');
const BlacklistToken = require('./blacklistToken.model');
const { sequelize } = require('../config/database');

// ✅ Doctor ↔ Hospital (One-to-Many)
Hospital.hasMany(Doctor, { foreignKey: 'hospitalId', onDelete: 'CASCADE' });
Doctor.belongsTo(Hospital, { foreignKey: 'hospitalId' });

// ✅ User ↔ Doctor using licenseNumber (One-to-Many, custom FK)
User.belongsTo(Doctor, {
  as: 'primaryDoctor',
  foreignKey: 'primaryDoctorLicense',
  targetKey: 'licenseNumber', // ⬅️ use Doctor.licenseNumber instead of id
});
Doctor.hasMany(User, {
  as: 'patients',
  foreignKey: 'primaryDoctorLicense',
  sourceKey: 'licenseNumber',
});

// ✅ User ↔ Hospital (Many-to-Many)
User.belongsToMany(Hospital, {
  through: 'user_hospitals',
  as: 'preferredHospitals',
});
Hospital.belongsToMany(User, {
  through: 'user_hospitals',
  as: 'patients',
});

// ✅ Sync all models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use force: true if structure is stuck
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = {
  User,
  Doctor,
  Hospital,
  BlacklistToken,
  syncDatabase,
};
