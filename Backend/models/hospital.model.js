const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Hospital = sequelize.define(
  'Hospital',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    addressStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressZip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Hospital;
