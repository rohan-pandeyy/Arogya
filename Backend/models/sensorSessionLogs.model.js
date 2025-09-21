const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SensorSessionLog = sequelize.define(
  'SensorSessionLog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    joint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    repCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    repDurationMs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sessionDuration: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    rom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    qualityScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stability: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: 'SensorSessionLogs',
    timestamps: false,
  }
);

module.exports = SensorSessionLog;