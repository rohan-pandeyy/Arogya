const User = require('./user.model');
const Doctor = require('./doctor.model');
const Hospital = require('./hospital.model');
const BlacklistToken = require('./blacklistToken.model');
const { sequelize } = require('../config/database');

// 🔁 Correct One-to-Many Relationship (Doctor → Hospital)
Hospital.hasMany(Doctor, { foreignKey: "hospitalId", onDelete: "CASCADE" });
Doctor.belongsTo(Hospital, { foreignKey: "hospitalId" });


// Optional: User Relationships (unchanged)
User.belongsTo(Doctor, { as: "primaryDoctor" });
Doctor.hasMany(User, { as: "patients" });

User.belongsToMany(Hospital, {
  through: 'user_hospitals',
  as: 'preferredHospitals',
});
Hospital.belongsToMany(User, {
  through: "user_hospitals",
  as: "patients",
});

// ✅ Sync all models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // or { force: true } for full reset
    console.log("Database synced successfully");
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
