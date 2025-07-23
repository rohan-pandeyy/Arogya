module.exports = (sequelize, DataTypes) => {
  const SensorDataRealtime = sequelize.define(
    'sensor_data_realtime',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      session_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'physio_sessions', // Must match your actual table name
          key: 'id',
        },
      },
      timestamp: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Timer for AI-readiness',
      },
      acc_x: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      acc_y: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      acc_z: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      gyro_x: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      gyro_y: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      gyro_z: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'sensor_data_realtime',
      underscored: true,
      indexes: [
        {
          fields: ['session_id', 'timestamp'],
        },
      ],
    },
  );

  // Define association to physio_sessions
  SensorDataRealtime.associate = (models) => {
    SensorDataRealtime.belongsTo(models.PhysioSession, {
      foreignKey: 'session_id',
    });
  };

  return SensorDataRealtime;
};
