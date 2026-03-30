const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.get('/month', eventController.getEventsByMonth);

// Protected routes (Admin Only)
router.post('/', authController.protect, eventController.createEvent);
router.patch('/:id', authController.protect, eventController.updateEvent);
router.delete('/:id', authController.protect, eventController.deleteEvent);

module.exports = router;
