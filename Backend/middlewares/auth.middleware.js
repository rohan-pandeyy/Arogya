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
    try {
      // Extract token from 'Bearer TOKEN'
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user by the ID from the token payload
      // Eager load the associated Roles to get user's roles
      req.user = await User.findByPk(decoded.id, {
        include: [
          {
            model: Role,
            as: 'Roles', // This alias must match User-Role model association
            attributes: ['name'],
            through: { attributes: [] }, // Exclude junction table attributes
          },
        ],
      });

      // If user not found (e.g., deleted after token was issued), send an unauthorized error
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is present at all, send an unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * @desc    Authorize user based on roles. This is a higher-order function.
 * @param   {...string} allowedRoles - A list of role names that are allowed to access the route.
 * @returns {function} Express middleware function.
 */
const checkRoles = (...allowedRoles) => {
  // This returned function is the actual middleware that Express will run
  return (req, res, next) => {
    // The 'protect' middleware should have already run and attached the user and their roles
    if (!req.user || !req.user.Roles) {
      return res.status(403).json({ message: 'Forbidden: User roles not available.' });
    }

    // Get an array of the user's role names (e.g., ['patient', 'admin'])
    const userRoles = req.user.Roles.map((role) => role.name);

    // Check if the user's roles array has at least one role that is in the allowedRoles array.
    const hasPermission = userRoles.some((role) => allowedRoles.includes(role));

    if (hasPermission) {
      // If the user has a permitted role, proceed to the next middleware or the route handler
      next();
    } else {
      // If not, send a 403 Forbidden error
      res.status(403).json({
        message: `Forbidden: Access requires one of the following roles: ${allowedRoles.join(', ')}.`,
      });
    }
  };
};

module.exports = { protect, checkRoles };
