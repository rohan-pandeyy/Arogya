const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password, name, age, gender} = req.body;

    const hashedPassword = await userService.hashPassword(password);

    const user = await userService.createUser(email, hashedPassword, name, age, gender);

    const token = user.generateAuthToken();

    res.status(201).json({token, user});
}