const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ status: 'success', results: events.length, data: { events } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getEventsByMonth = async (req, res) => {
  try {
    const { year, month } = req.query; // 1-indexed month
    if (!year || !month) {
        return res.status(400).json({ status: 'fail', message: 'Year and month are required' });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const events = await Event.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    res.status(200).json({ status: 'success', results: events.length, data: { events } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({ status: 'success', data: { event: newEvent } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!event) return res.status(404).json({ status: 'fail', message: 'Event not found' });
    res.status(200).json({ status: 'success', data: { event } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ status: 'fail', message: 'Event not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
