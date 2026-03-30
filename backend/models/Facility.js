const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Facility name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Academic', 'Residential', 'Sports', 'Social'],
    default: 'Academic'
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String,
    required: [true, 'Facility image is required']
  },
  icon: {
    type: String,
    required: [true, 'Icon identifier is required'],
    default: 'Globe'
  },
  capacity: {
    type: String,
    required: [true, 'Capacity information is required'],
    default: 'TBD'
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Open', 'In Use', 'Maintenance'],
    default: 'Open'
  }
}, { timestamps: true });

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
