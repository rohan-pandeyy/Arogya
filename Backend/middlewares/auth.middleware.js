const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

/**
 * Verifies the JWT from the Authorization header or from cookies.
 * Attaches the full user object with roles to req.user.
 */
const verifyToken = async (req, res, next) => {
  // This log is just for confirmation
  console.log('[auth.middleware.js] Verifying token. Cookies found:', !!req.cookies);

  let token;
  const authHeader = req.headers.authorization;

  // 1. Check for Bearer token in Authorization header
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  // 2. If not found, check for token in cookies (for SSR)
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token is found in either place, deny access.
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // --- Enhanced Debugging ---
    // Log if the secret key is missing from your .env file
    if (!process.env.JWT_SECRET_KEY) {
        console.error('[auth.middleware.js] FATAL: JWT_SECRET_KEY is not defined in .env file!');
    }

    // Log the current time on the server to check for clock skew
    console.log('[auth.middleware.js] Current Server Time (UTC):', new Date().toUTCString());
    console.log('[auth.middleware.js] Verifying token now...');

    // 1. Try to decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        // Add a tolerance for minor clock skew between servers (e.g., 10 seconds)
        clockTolerance: 10,
    });
    console.log('[auth.middleware.js] Token decoded successfully for user ID:', decoded.id);

    // 2. Try to find the user in the database
    const user = await User.findByPk(decoded.id, {
      include: {
        model: Role,
        attributes: ['name'],
        through: { attributes: [] }, // Don't include the join table attributes
      },
    });

    // 3. Check if the user exists
    if (!user) {
      console.warn('[auth.middleware.js] TOKEN VALID, BUT USER NOT FOUND IN DB. User ID:', decoded.id);
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    // If everything is successful, attach user to request and continue
    console.log('[auth.middleware.js] User found, proceeding to next middleware.');
    req.user = user;
    next();
  } catch (error) {
    // If jwt.verify fails, this block will run.
    // Log the token's expiration date for easier debugging
    const unverifiedDecoded = jwt.decode(token);
    if (unverifiedDecoded && unverifiedDecoded.exp) {
        console.error(`[auth.middleware.js] Token expired at (UTC): ${new Date(unverifiedDecoded.exp * 1000).toUTCString()}`);
    }
    console.error('[auth.middleware.js] JWT verification failed:', error.message);
    return res.status(401).json({ message: `Invalid Token: ${error.message}` });
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