const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');
const Facility = require('./facility.model');

const Staff = sequelize.define(
  'Staff',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    facilityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Facility,
        key: 'id',
      },
    },
    // e.g., 'receptionist', 'facility-admin'
    role: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true },
);

module.exports = Staff;