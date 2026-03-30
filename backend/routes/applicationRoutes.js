const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route for students to apply
router.post('/submit', applicationController.submitApplication);

// Protected routes for admins to manage applications
router.use(authController.protect);

router.get('/', applicationController.getAllApplications);
router.route('/:id')
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplicationStatus)
  .delete(applicationController.deleteApplication);

module.exports = router;
