const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', authController.getMe);
router.post('/logout', authController.logout);

// Admin only - Update Password
router.patch('/updatePassword', authController.protect, authController.updatePassword);

module.exports = router;
