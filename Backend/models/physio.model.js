const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PhysioSession = sequelize.define(
  'PhysioSession',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    patient_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    therapist_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    joint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'PhysioSessions',
    timestamps: true,
  }
);

module.exports = PhysioSession;
