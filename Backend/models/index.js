const { sequelize } = require('../config/database');
const User = require('./user.model');
const Doctor = require('./doctor.model');
const Hospital = require('./hospital.model');
const BlacklistToken = require('./blacklistToken.model');

// Setup associations
Doctor.belongsTo(Hospital, { foreignKey: 'hospitalId' });
Hospital.hasMany(Doctor, { foreignKey: 'hospitalId' });

User.belongsTo(Doctor, { foreignKey: 'primaryDoctorLicense', targetKey: 'licenseNumber' });
Doctor.hasMany(User, { foreignKey: 'primaryDoctorLicense', sourceKey: 'licenseNumber' });

module.exports = {
  sequelize,
  User,
  Doctor,
  Hospital,
  BlacklistToken,
};
