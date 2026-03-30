const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Brief description is required']
  },
  fullContent: {
    type: String,
    required: [true, 'Full story content is required']
  },
  image: {
    type: String,
    required: [true, 'Featured image is required'] // Store Cloudinary URL
  },
  category: {
    type: String,
    enum: ['Administration', 'Academic', 'Culture', 'Wellbeing', 'Sports', 'Events'],
    default: 'Administration'
  },
  date: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '3 min read'
  },
  author: {
    type: String,
    default: 'Ecose Editorial Team'
  }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

module.exports = News;
