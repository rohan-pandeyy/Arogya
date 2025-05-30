const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../Frontend'));
app.use('/static', express.static('static'));

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;