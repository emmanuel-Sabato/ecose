const express = require('express');
const facilityController = require('../controllers/facilityController');
const authController = require('../controllers/authController');
const { facilitiesUpload } = require('../utils/cloudinary');

const router = express.Router();

router.get('/', facilityController.getAllFacilities);
router.get('/:id', facilityController.getFacility);

// Protected routes (Admin Only)
router.post('/', authController.protect, facilitiesUpload.single('image'), facilityController.createFacility);
router.patch('/:id', authController.protect, facilitiesUpload.single('image'), facilityController.updateFacility);
router.delete('/:id', authController.protect, facilityController.deleteFacility);

module.exports = router;
