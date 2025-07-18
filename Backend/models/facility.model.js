const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Facility = sequelize.define(
  'Facility',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Type can be 'hospital', 'clinic', 'dentistry', etc.
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Other metadata fields can be added here
  },
  {
    timestamps: true,
  },
);

module.exports = Facility;
