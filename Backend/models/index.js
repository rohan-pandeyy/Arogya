const User = require("./user.model");
const Doctor = require("./doctor.model");
const Hospital = require("./hospital.model");
const BlacklistToken = require("./blacklistToken.model");
const { sequelize } = require("../config/database");

// Define associations
Doctor.belongsToMany(Hospital, { through: "doctor_hospitals" });
Hospital.belongsToMany(Doctor, { through: "doctor_hospitals" });

User.belongsTo(Doctor, { as: "primaryDoctor" });
Doctor.hasMany(User, { as: "patients" });

User.belongsToMany(Hospital, {
  through: "user_hospitals",
  as: "preferredHospitals",
});
Hospital.belongsToMany(User, { through: "user_hospitals", as: "patients" });

// Sync all models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = {
  User,
  Doctor,
  Hospital,
  BlacklistToken,
  syncDatabase,
};
