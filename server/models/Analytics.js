const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: { 
    type: String, 
    required: true,
    unique: true // YYYY-MM-DD
  },
  views: { 
    type: Number, 
    default: 0 
  },
  visitors: [{ 
    type: String // Hashed IPs or unique client IDs
  }],
  devices: {
    mobile: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
