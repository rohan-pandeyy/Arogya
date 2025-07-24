// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database');
// const Patient = require('./patient.model');
// const PhysioSession = require('./physioSession.model');

// const SensorSessionLog = sequelize.define(
//   'SensorSessionLog',
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     patientId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: Patient,
//         key: 'id',
//       },
//     },
//     sessionId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: PhysioSession,
//         key: 'id',
//       },
//     },
//     timestamp: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//       comment: 'When this rep was recorded',
//     },
//     joint: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       comment: 'Name of the joint\neg: Knee, Shoulder',
//     },
//     repCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     repDurationMs: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       comment: 'Average rep duration in ms',
//     },
//     rom: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       comment: 'Average Range of Motion in degrees',
//     },
//     qualityScore: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       comment: '0.0 to 1.0',
//     },
//     stability: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       comment: 'low, medium, high',
//       validate: {
//         isIn: [['low', 'medium', 'high']],
//       },
//     },
//   },
//   {
//     tableName: 'sensor_session_logs',
//     underscored: true,
//     timestamps: false, // This model has its own `timestamp` field
//   },
// );

// module.exports = SensorSessionLog;
