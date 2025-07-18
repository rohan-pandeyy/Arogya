const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 'patient', 'doctor', 'staff', 'admin'
    },
  },
  {
    timestamps: false, // Roles are static, no need for timestamps
  },
);

module.exports = Role;