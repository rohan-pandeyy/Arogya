const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Patient = require('./patient.model');
const Doctor = require('./doctor.model');

const PhysioSession = sequelize.define(
  'PhysioSession',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id',
      },
    },
    therapistId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Doctor,
        key: 'id',
      },
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'scheduled',
      allowNull: false,
      validate: {
        isIn: [['scheduled', 'completed', 'cancelled', 'rescheduled']],
      },
    },
    joint: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'e.g., knee, shoulder, elbow',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'physio_sessions',
  },
);

module.exports = PhysioSession;
