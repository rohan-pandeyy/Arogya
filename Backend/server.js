require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');

// --- Route Imports ---
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const facilityRoutes = require('./routes/facility.routes');
const physioRoutes = require('./routes/physio.routes');

// --- Initialize Express App ---
const app = express();

// --- Core Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: '*', // For development. In production, restrict this to your frontend's URL.
  }),
);

// Enable JSON body parsing
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('AROGYA API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/physio', physioRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 80;

const startServer = async () => {
  await testConnection(); // Test the database connection
  await syncDatabase(); // Sync models (for development)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
