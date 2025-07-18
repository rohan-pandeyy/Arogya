const User = require('./user.model');
const Role = require('./role.model');
const Patient = require('./patient.model');
const Doctor = require('./doctor.model');
const Staff = require('./staff.model');
const Facility = require('./facility.model');
const BlacklistToken = require('./blacklistToken.model');
const { sequelize } = require('../config/database');

// User -> Role (Many-to-Many)
const UserRole = sequelize.define('UserRole', {}, { timestamps: false });
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

// User -> Patient (One-to-One)
User.hasOne(Patient, { foreignKey: 'id', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'id' });

// User -> Doctor (One-to-One)
User.hasOne(Doctor, { foreignKey: 'id', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'id' });

// User -> Staff (One-to-One)
User.hasOne(Staff, { foreignKey: 'id', onDelete: 'CASCADE' });
Staff.belongsTo(User, { foreignKey: 'id' });

// Facility -> Doctor (One-to-Many)
Facility.hasMany(Doctor, {
  foreignKey: 'facilityId',
  as: 'doctors',
});
Doctor.belongsTo(Facility, {
  foreignKey: 'facilityId',
  as: 'facility',
});

// Facility -> Staff (One-to-Many)
Facility.hasMany(Staff, {
  foreignKey: 'facilityId',
  as: 'staffMembers',
});
Staff.belongsTo(Facility, {
  foreignKey: 'facilityId',
  as: 'facility',
});

// ===============================
// Sync Function (Only in Development)
// ===============================
const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      // Seed roles if they don't exist
      await Role.findOrCreate({ where: { name: 'patient' } });
      await Role.findOrCreate({ where: { name: 'doctor' } });
      await Role.findOrCreate({ where: { name: 'staff' } });
      await Role.findOrCreate({ where: { name: 'admin' } });
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
  Role,
  UserRole,
  Patient,
  Doctor,
  Staff,
  Facility,
  BlacklistToken,
  syncDatabase,
  sequelize,
};
