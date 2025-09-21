const { SensorSessionLog } = require('../models');

const createLog = async (req, res) => {
  try {
    const log = await SensorSessionLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    console.error('Error creating sensor session log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createLog,
};
