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
    patient_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    joint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rep_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rep_duration_ms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quality_score: {
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
