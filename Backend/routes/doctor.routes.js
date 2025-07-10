const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");

router.post("/", doctorController.createDoctor);
module.exports = router;
