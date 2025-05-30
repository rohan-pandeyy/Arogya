const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports.createUser = async (email, password, name, age, gender) => {
    if (!email || !password || !name || !age || !gender) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({email, password, name, age, gender});
    return user;
}

