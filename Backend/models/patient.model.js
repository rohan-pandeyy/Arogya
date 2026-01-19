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
    diagonosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allergies: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  { timestamps: true },
);

module.exports = Patient;