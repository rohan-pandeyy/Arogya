const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Doctor = sequelize.define('Doctor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (doctor) => {
            if (doctor.password) {
                doctor.password = await bcrypt.hash(doctor.password, 10);
            }
        },
        beforeUpdate: async (doctor) => {
            if (doctor.changed('password')) {
                doctor.password = await bcrypt.hash(doctor.password, 10);
            }
        }
    }
});

// Instance methods
Doctor.prototype.generateAuthToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

Doctor.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = Doctor; 