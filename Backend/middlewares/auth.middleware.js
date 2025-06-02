const { User, BlacklistToken } = require('../models');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from header or cookie
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Missing token' });
        }

        // Check if token is blacklisted
        const blacklistedToken = await BlacklistToken.findOne({ where: { token } });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Token has been invalidated' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Find user by id
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        return next();
        
    } catch (error) {
        console.error('Auth error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Authentication failed' });
    }
};