const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

module.exports = app;