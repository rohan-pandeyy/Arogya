// models/exerciseSession.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ExerciseSession = sequelize.define(
  'ExerciseSession',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Doctors',
        key: 'id',
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exercise_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = ExerciseSession;
