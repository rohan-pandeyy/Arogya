const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

/**
 * Verifies the JWT from the Authorization header or from cookies.
 * Attaches the full user object with roles to req.user.
 */
const verifyToken = async (req, res, next) => {
  console.log('[auth.middleware.js] Verifying token. Cookies found:', !!req.cookies);

  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
        console.error('[auth.middleware.js] FATAL: JWT_SECRET_KEY is not defined in .env file!');
    }
    console.log('[auth.middleware.js] Current Server Time (UTC):', new Date().toUTCString());
    console.log('[auth.middleware.js] Verifying token now...');

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        clockTolerance: 10,
    });
    console.log('[auth.middleware.js] Token decoded successfully for user ID:', decoded.id);
    const user = await User.findByPk(decoded.id, {
      include: {
        model: Role,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    if (!user) {
      console.warn('[auth.middleware.js] TOKEN VALID, BUT USER NOT FOUND IN DB. User ID:', decoded.id);
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    console.log('[auth.middleware.js] User found, proceeding to next middleware.');
    req.user = user;
    next();
  } catch (error) {
    const unverifiedDecoded = jwt.decode(token);
    if (unverifiedDecoded && unverifiedDecoded.exp) {
        console.error(`[auth.middleware.js] Token expired at (UTC): ${new Date(unverifiedDecoded.exp * 1000).toUTCString()}`);
    }
    console.error('[auth.middleware.js] JWT verification failed:', error.message);
    return res.status(401).json({ message: `Invalid Token: ${error.message}` });
  }
};

const checkRoles = (requiredRoles) => (req, res, next) => {
  const userRoles = req.user.Roles.map((role) => role.name);
  const hasRole = requiredRoles.some((role) => userRoles.includes(role));

  if (!hasRole) {
    return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
  }
  next();
};

module.exports = { verifyToken, checkRoles };