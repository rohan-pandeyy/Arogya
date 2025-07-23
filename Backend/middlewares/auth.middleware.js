const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

/**
 * @desc    Protect routes by verifying JWT token.
 * Attaches the user with their roles to the request object.
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is present, send an unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token using the secret key - check your .env file for the correct key name
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Find the user by the ID from the token payload
    // Use 'Roles' for many-to-many relationship
    req.user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          as: 'Roles',
          attributes: ['name'],
          through: { attributes: [] }, // Exclude junction table attributes
        },
      ],
    });
    // If user not found, send an unauthorized error
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

/**
 * @desc    Authorize user based on roles.
 * @param   {...string} allowedRoles - A list of role names that are allowed to access the route.
 * @returns {function} Express middleware function.
 */
const checkRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists
    if (!req.user) {
      return res.status(403).json({ message: 'Forbidden: User not authenticated.' });
    }

    // Get user's role names - for many-to-many relationship, it's plural Roles
    const userRoles = req.user.Roles?.map(role => role.name) || [];

    if (userRoles.length === 0) {
      return res.status(403).json({ message: 'Forbidden: User role not found.' });
    }

    // Check if the user has any of the allowed roles
    const hasPermission = allowedRoles.some(role => userRoles.includes(role));
  
    allowedRoles.forEach(allowedRole => {
      console.log(`  - "${allowedRole}" in userRoles:`, userRoles.includes(allowedRole));
    });
    
    if (hasPermission) {
      next();
    } else {
      res.status(403).json({
        message: `Forbidden: Access requires one of the following roles: ${allowedRoles.join(', ')}.`,
      });
    }
  };
};

module.exports = { protect, checkRoles };