const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');
const { upload } = require('../utils/cloudinary');

const router = express.Router();

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNews);

// Protected routes (Admin Only)
router.post('/', authController.protect, upload.single('image'), newsController.createNews);
router.patch('/:id', authController.protect, upload.single('image'), newsController.updateNews);
router.delete('/:id', authController.protect, newsController.deleteNews);

module.exports = router;
