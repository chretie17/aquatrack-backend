const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/meters', auth, adminController.addMeter);
router.get('/applications', auth, adminController.viewAndManageApplications);
router.put('/applications/status', auth, adminController.updateApplicationStatus);
router.post('/claims/respond', auth, adminController.respondToClaim);
router.get('/meters/map', auth, adminController.viewMetersOnMap);
router.get('/reports', auth, adminController.generateReports);

module.exports = router;
