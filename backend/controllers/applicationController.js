const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { application }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: { applications }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ status: 'fail', message: 'Application not found' });
    }
    res.status(200).json({ status: 'success', data: { application } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Reviewed', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid status' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ status: 'fail', message: 'Application not found' });
    }

    res.status(200).json({ status: 'success', data: { application } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ status: 'fail', message: 'Application not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
