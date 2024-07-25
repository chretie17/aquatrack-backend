// routes/mutationApplicationRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const mutationApplicationController = require('../controllers/metermutationController');
const auth = require('../middleware/auth');

router.post('/mutation-application', auth, upload.fields([
  { name: 'identityProof', maxCount: 1 },
  { name: 'newPropertyProof', maxCount: 1 },
  { name: 'oldPropertyProof', maxCount: 1 },
  { name: 'applicationLetter', maxCount: 1 },
  { name: 'utilityBillProof', maxCount: 1 },
]), mutationApplicationController.createApplication);

router.get('/mutation-application', auth, mutationApplicationController.getAllApplications);
router.get('/mutation-application/:id', auth, mutationApplicationController.getApplicationById);
router.put('/mutation-application/:id', auth, upload.fields([
  { name: 'identityProof', maxCount: 1 },
  { name: 'newPropertyProof', maxCount: 1 },
  { name: 'oldPropertyProof', maxCount: 1 },
  { name: 'applicationLetter', maxCount: 1 },
  { name: 'utilityBillProof', maxCount: 1 },
]), mutationApplicationController.updateApplication);
router.delete('/mutation-application/:id', auth, mutationApplicationController.deleteApplication);

module.exports = router;
