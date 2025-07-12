const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hospital = require("./hospital.model");

const Doctor = sequelize.define(
  "Doctor",
  {
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true, // now the primary key
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearOfStart: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1950,
        max: new Date().getFullYear(),
      },
    },
    hospitalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Hospital,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (doctor) => {
        if (doctor.password) {
          doctor.password = await bcrypt.hash(doctor.password, 10);
        }
      },
      beforeUpdate: async (doctor) => {
        if (doctor.changed("password")) {
          doctor.password = await bcrypt.hash(doctor.password, 10);
        }
      },
    },
  }
);

// Associations
Doctor.belongsTo(Hospital, { foreignKey: "hospitalId" });
Hospital.hasMany(Doctor, { foreignKey: "hospitalId", onDelete: "CASCADE" });

// Auth methods
Doctor.prototype.generateAuthToken = function () {
  return jwt.sign({ licenseNumber: this.licenseNumber }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

Doctor.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Doctor;
