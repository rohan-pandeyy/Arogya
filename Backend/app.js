require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const { testConnection } = require('./config/database');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const doctorRoutes = require('./routes/doctor.routes');

// Test database connection
testConnection();

// Sync database models
const syncOptions = process.env.NODE_ENV === 'test' ? { force: true } : {};
sequelize.sync(syncOptions).then(() => {
  console.log('All models were synchronized successfully.');
});

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
// const session = require("express-session");
// const bcrypt = require("bcryptjs");
// const path = require('path');

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/hospitals', hospitalRoutes);
app.use('/api/user', userRoutes);
app.use('/doctors', doctorRoutes);

module.exports = app;
