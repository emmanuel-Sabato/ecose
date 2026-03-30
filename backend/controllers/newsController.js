const News = require('../models/News');
const { cloudinary } = require('../utils/cloudinary');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', results: news.length, data: { news } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ status: 'fail', message: 'News article not found' });
    res.status(200).json({ status: 'success', data: { news } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, description, fullContent, category, readTime, author } = req.body;
    
    // req.file will be populated by multer if we use middleware
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'Featured image is required' });
    }

    const newNews = await News.create({
      title,
      description,
      fullContent,
      category,
      readTime: readTime || '3 min read',
      author: author || 'Ecose Editorial Team',
      image: req.file.path // Cloudinary URL
    });

    res.status(201).json({ status: 'success', data: { news: newNews } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ status: 'fail', message: 'News article not found' });

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
      // Optional: Delete old image from Cloudinary here
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ status: 'success', data: { news: updatedNews } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ status: 'fail', message: 'News article not found' });
    
    // Optional: Delete from Cloudinary
    
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
