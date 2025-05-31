const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Missing token'});
    }

    const isBlacklisted = await userModel.findOne({token});

    if (isBlacklisted) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }

        req.user = user;
        return next();
        
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({message: 'Invalid token'});
    }
}