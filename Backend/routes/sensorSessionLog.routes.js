const express = require('express');
const router = express.Router();
const sensorSessionLogController = require('../controllers/sensorSessionLog.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, sensorSessionLogController.createLog);

module.exports = router;
