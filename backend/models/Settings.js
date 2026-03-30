const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    default: 'Ecose St Kizito Musambira'
  },
  contactEmail: {
    type: String,
    default: 'info@ecosemusambira.rw'
  },
  contactPhone: {
    type: String,
    default: '+250 XXX XXX XXX'
  },
  address: {
    type: String,
    default: 'Musambira, Southern Province, Rwanda'
  },
  socialLinks: {
    facebook: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    youtube: { type: String, default: '#' }
  },
  securityBranding: {
    type: String,
    default: 'Secured By MAGICPENTAGON'
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
