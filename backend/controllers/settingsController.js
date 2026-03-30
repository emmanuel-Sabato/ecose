const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Initialize with default values if not exists
      settings = await Settings.create({});
    }
    res.status(200).json({ status: 'success', data: { settings } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }
    res.status(200).json({ status: 'success', data: { settings } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
