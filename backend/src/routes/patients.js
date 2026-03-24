const express = require('express');
const router = express.Router();
const { getAllpatient } = require('../controller/patientController');

router.route('/').get(getAllpatient);

module.exports = router;