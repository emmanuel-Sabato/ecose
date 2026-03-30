const Facility = require('../models/Facility');
const { cloudinary } = require('../utils/cloudinary');

exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', results: facilities.length, data: { facilities } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ status: 'fail', message: 'Facility not found' });
    res.status(200).json({ status: 'success', data: { facility } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const { title, category, description, icon, capacity, status } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'Facility image is required' });
    }

    const newFacility = await Facility.create({
      title,
      category,
      description,
      icon: icon || 'Globe',
      capacity,
      status: status || 'Open',
      image: req.file.path // Cloudinary URL
    });

    res.status(201).json({ status: 'success', data: { facility: newFacility } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ status: 'fail', message: 'Facility not found' });

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedFacility = await Facility.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ status: 'success', data: { facility: updatedFacility } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) return res.status(404).json({ status: 'fail', message: 'Facility not found' });
    
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
