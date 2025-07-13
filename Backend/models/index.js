const { sequelize } = require('../config/database');
const User = require('./user.model');
const Doctor = require('./doctor.model');
const BlacklistToken = require('./blacklistToken.model');

// Setup associations if any
User.belongsTo(Doctor, { foreignKey: 'primaryDoctorLicense', targetKey: 'licenseNumber' });
Doctor.hasMany(User, { foreignKey: 'primaryDoctorLicense', sourceKey: 'licenseNumber' });

module.exports = {
  sequelize,
  User,
  Doctor,
  BlacklistToken,
};
