const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');  

// Define your routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authController.getUser);
router.get('/user', auth, authController.getUser);


module.exports = router;
