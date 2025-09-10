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
    patient_Id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    session_Id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_Time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_Time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    joint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rep_Count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rep_Duration_Ms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quality_Score: {
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
