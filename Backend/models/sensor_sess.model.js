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
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true,
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
    rom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    qualityScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stability: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'SensorSession',
    timestamps: true,
  }
);

module.exports = SensorSessionLog;
