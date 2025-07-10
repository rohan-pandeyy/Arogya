const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['male', 'female', 'other']]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    bloodGroup: {
        type: DataTypes.STRING,
        allowNull: true
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: true
    },
    allergies: {
        type: DataTypes.STRING,
        allowNull: true
    }    
    
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

// Instance methods
User.prototype.generateAuthToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
