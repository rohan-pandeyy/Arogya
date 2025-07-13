const { sequelize } = require('../config/database');
const User = require('./User.model');
const Doctor = require('./Doctor.model');
const BlacklistToken = require('./BlacklistToken.model');

// Setup associations if any
User.belongsTo(Doctor, { foreignKey: 'primaryDoctorLicense', targetKey: 'licenseNumber' });
Doctor.hasMany(User, { foreignKey: 'primaryDoctorLicense', sourceKey: 'licenseNumber' });

module.exports = {
  sequelize,
  User,
  Doctor,
  BlacklistToken,
};
