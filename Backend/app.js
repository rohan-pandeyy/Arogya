const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');

connectToDb();

// Middleware
app.use(cors());

// const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
// const session = require("express-session");
// const bcrypt = require("bcryptjs");
// const path = require('path');

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;