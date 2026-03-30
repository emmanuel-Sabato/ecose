const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['holiday', 'day-off', 'morning-only', 'afternoon-only', 'exam', 'event'],
    default: 'event'
  },
  isTermMarker: {
    type: Boolean,
    default: false
  },
  termName: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
