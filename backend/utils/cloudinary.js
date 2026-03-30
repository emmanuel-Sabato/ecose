const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret
});

const newsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecose_news',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, height: 1250, crop: 'limit' }]
  }
});

const facilitiesStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecose_facilities',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }] // Wider for buildings
  }
});

const upload = multer({ storage: newsStorage });
const facilitiesUpload = multer({ storage: facilitiesStorage });

module.exports = { cloudinary, upload, facilitiesUpload };
