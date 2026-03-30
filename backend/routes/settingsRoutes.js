const express = require('express');
const settingsController = require('../controllers/settingsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', settingsController.getSettings);

// Protected routes (Admin Only)
router.patch('/', authController.protect, settingsController.updateSettings);

module.exports = router;
