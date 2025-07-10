const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const BlacklistToken = sequelize.define("BlacklistToken", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    expires: 86400, // 24 hours in seconds
  },
});

module.exports = BlacklistToken;
