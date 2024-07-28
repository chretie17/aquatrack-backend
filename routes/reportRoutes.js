const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');


router.get('/generate', reportController.generateReport);
router.get('/data', reportController.getReportData);

module.exports = router;
