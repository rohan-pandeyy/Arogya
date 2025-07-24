const User = require('./user.model');
const Role = require('./role.model');
const Patient = require('./patient.model');
const Doctor = require('./doctor.model');
const Staff = require('./staff.model');
const Facility = require('./facility.model');
const BlacklistToken = require('./blacklistToken.model');
const PhysioSession = require('./physioSession.model');
// const SensorSessionLog = require('./sensorSessionLog.model');
const { sequelize } = require('../config/database');

// --- User -> Role (Many-to-Many) ---
// Define the junction table
const UserRole = sequelize.define('UserRole', {}, { timestamps: false });

// Define the associations with explicit aliases AND foreign keys
// This removes any ambiguity for Sequelize during JOIN operations.
User.belongsToMany(Role, {
  through: UserRole,
  as: 'Roles',
  foreignKey: 'UserId', // Explicitly define the foreign key for User
});
Role.belongsToMany(User, {
  through: UserRole,
  as: 'Users',
  foreignKey: 'RoleId', // Explicitly define the foreign key for Role
});


// --- Other Associations ---

// User -> Patient (One-to-One)
User.hasOne(Patient, { foreignKey: 'id', as: 'patientProfile', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'id' });

// User -> Doctor (One-to-One)
User.hasOne(Doctor, { foreignKey: 'id', as: 'doctorProfile', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'id' });

// User -> Staff (One-to-One)
User.hasOne(Staff, { foreignKey: 'id', as: 'staffProfile', onDelete: 'CASCADE' });
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

// Patient -> PhysioSession (One-to-Many)
Patient.hasMany(PhysioSession, {
  foreignKey: 'patientId',
  as: 'physioSessions',
});
PhysioSession.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'patient',
});

// Doctor -> PhysioSession (One-to-Many)
Doctor.hasMany(PhysioSession, {
  foreignKey: 'therapistId',
  as: 'physioSessions',
});
PhysioSession.belongsTo(Doctor, {
  foreignKey: 'therapistId',
  as: 'therapist',
});

// // Patient -> SensorSessionLog (One-to-Many)
// Patient.hasMany(SensorSessionLog, {
//   foreignKey: 'patientId',
//   as: 'sensorSessionLogs',
// });
// SensorSessionLog.belongsTo(Patient, {
//   foreignKey: 'patientId',
//   as: 'patient',
// });

// // PhysioSession -> SensorSessionLog (One-to-Many)
// PhysioSession.hasMany(SensorSessionLog, {
//   foreignKey: 'sessionId',
//   as: 'sensorSessionLogs',
// });
// SensorSessionLog.belongsTo(PhysioSession, {
//   foreignKey: 'sessionId',
//   as: 'session',
// });

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
      console.log(
        '⚠️ Skipping sequelize.sync() in production. Use migrations instead.',
      );
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
  PhysioSession,
  // SensorSessionLog,
  syncDatabase,
  sequelize,
};
