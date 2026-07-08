const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Analytics = require('../models/Analytics');
const auth = require('../middleware/auth');

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// @route   POST /api/analytics/track
// @desc    Track a page visit
// @access  Public
router.post('/track', async (req, res) => {
  try {
    const today = getTodayString();
    
    // Hash the IP address for privacy (GDPR compliant-ish)
    // In production (Render/Heroku), you might need req.headers['x-forwarded-for']
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const hashedIp = crypto.createHash('sha256').update(rawIp).digest('hex');
    
    // Simple mobile detection from user agent
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    
    // Find or create today's analytics record
    let analytics = await Analytics.findOne({ date: today });
    
    if (!analytics) {
      analytics = new Analytics({
        date: today,
        views: 1,
        visitors: [hashedIp],
        devices: {
          mobile: isMobile ? 1 : 0,
          desktop: isMobile ? 0 : 1
        }
      });
    } else {
      // Increment views
      analytics.views += 1;
      
      // Add unique visitor if not already tracked today
      if (!analytics.visitors.includes(hashedIp)) {
        analytics.visitors.push(hashedIp);
        if (isMobile) {
          analytics.devices.mobile += 1;
        } else {
          analytics.devices.desktop += 1;
        }
      }
    }
    
    await analytics.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Analytics tracking error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/analytics
// @desc    Get analytics data for admin dashboard
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get the last 30 days of data, sorted by date ascending
    const data = await Analytics.find().sort({ date: 1 }).limit(30);
    
    // Format data for recharts
    const formattedData = data.map(day => ({
      date: day.date,
      views: day.views,
      visitors: day.visitors.length,
      mobile: day.devices.mobile,
      desktop: day.devices.desktop
    }));
    
    res.json(formattedData);
  } catch (err) {
    console.error('Analytics fetch error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
