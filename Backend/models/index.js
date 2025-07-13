const { sequelize } = require('../config/database');
const User = require('./User');
const Doctor = require('./Doctor');
const BlacklistToken = require('./BlacklistToken');

// Setup associations if any
User.belongsTo(Doctor, { foreignKey: 'primaryDoctorLicense', targetKey: 'licenseNumber' });
Doctor.hasMany(User, { foreignKey: 'primaryDoctorLicense', sourceKey: 'licenseNumber' });

module.exports = {
  sequelize,
  User,
  Doctor,
  BlacklistToken,
};
