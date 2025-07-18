const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

/**
 * Verifies the JWT from the Authorization header.
 * Attaches the full user object with roles to req.user.
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch user with their roles
    const user = await User.findByPk(decoded.id, {
      include: {
        model: Role,
        attributes: ['name'],
        through: { attributes: [] }, // Don't include the join table attributes
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user; // Attach user instance to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

/**
 * Middleware factory to check if the user has one of the required roles.
 * @param {string[]} requiredRoles - Array of role names (e.g., ['admin', 'staff'])
 */
const checkRoles = (requiredRoles) => (req, res, next) => {
  const userRoles = req.user.Roles.map((role) => role.name);
  const hasRole = requiredRoles.some((role) => userRoles.includes(role));

  if (!hasRole) {
    return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
  }
  next();
};

module.exports = { verifyToken, checkRoles };