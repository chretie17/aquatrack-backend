const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');
const auth = require('../middleware/auth');

router.post('/add', auth, meterController.addMeter);
router.put('/:id', auth, meterController.updateMeter);
router.delete('/:id', auth, meterController.deleteMeter);
router.get('/', auth, meterController.getAllMeters);

module.exports = router;
