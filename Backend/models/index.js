const User = require('./user.model');
const Doctor = require('./doctor.model');
const Hospital = require('./hospital.model');
const BlacklistToken = require('./blacklistToken.model');
const { sequelize } = require('../config/database');


Hospital.hasMany(Doctor, {
  foreignKey: 'hospitalId',
  onDelete: 'CASCADE',
});
Doctor.belongsTo(Hospital, {
  foreignKey: 'hospitalId',
});

User.belongsTo(Doctor, {
  as: 'primaryDoctor',
  foreignKey: 'primaryDoctorLicense',
  targetKey: 'licenseNumber', 
});
Doctor.hasMany(User, {
  as: 'patients',
  foreignKey: 'primaryDoctorLicense',
  sourceKey: 'licenseNumber',
});

User.belongsToMany(Hospital, {
  through: 'user_hospitals',
  as: 'preferredHospitals',
});
Hospital.belongsToMany(User, {
  through: 'user_hospitals',
  as: 'patients',
});

// ===============================
// Sync Function (Only in Development)
// ===============================
const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true }); // Safe for development only
      console.log('✅ Database synced successfully (development)');
    } else {
      console.log('⚠️ Skipping sequelize.sync() in production. Use migrations instead.');
    }
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

module.exports = {
  User,
  Doctor,
  Hospital,
  BlacklistToken,
  syncDatabase,
};
