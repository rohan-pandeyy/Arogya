const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

const Patient = sequelize.define(
  'Patient',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Note: The model uses 'diagonosis', so we'll match this on the frontend.
    diagonosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ✅ ADDED: New field to match the frontend form.
    allergies: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  { timestamps: true },
);

module.exports = Patient;