require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');

// --- Route Imports ---
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const facilityRoutes = require('./routes/facility.routes');
const patientRoutes = require('./routes/patient.routes');

// --- Initialize Express App ---
const app = express();

// --- Core Middleware ---
// The order of middleware is important.

// 1. CORS must come first to handle pre-flight requests from the browser.
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Allow requests from your frontend
      'https://a8cf18283436.ngrok-free.app/api/auth/register', //ngrok signup url here
    ],
    credentials: true, // This is crucial for allowing cookies
  }),
);

// 2. Parsers for JSON bodies and cookies. These must come before your routes.
app.use(express.json());
app.use(cookieParser()); // This will parse cookies and attach them to the `req.cookies` object

// --- API Routes ---
// These must come AFTER the middleware parsers have run.
app.get('/', (req, res) => {
  res.send('AROGYA API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/facilities', facilityRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 80;

const startServer = async () => {
  try {
    await testConnection(); // Test the database connection
    await syncDatabase(); // Sync models (for development)

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();
