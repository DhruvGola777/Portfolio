const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { resumeStorage } = require('../config/cloudinary');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../config/cache');

// Setup multer for resume upload using Cloudinary
const upload = multer({ storage: resumeStorage });

// @route   GET /api/profile
// @desc    Get profile details (Public)
router.get('/', cacheMiddleware(), async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.json({}); // Return empty object if no profile exists yet
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profile
// @desc    Update profile details (Protected)
router.post('/', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        {},
        { $set: req.body },
        { new: true }
      );
      clearCache('/api/profile');
      return res.json(profile);
    }

    // Create new if doesn't exist
    profile = new Profile(req.body);
    await profile.save();
    clearCache('/api/profile');
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profile/upload-resume
// @desc    Upload resume file (Protected)
router.post('/upload-resume', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
    // file path is directly provided by Cloudinary
    const fileUrl = req.file.path;
    
    // Update profile with resume URL
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({ resumeUrl: fileUrl });
    } else {
      profile.resumeUrl = fileUrl;
    }
    await profile.save();

    clearCache('/api/profile');
    res.json({ msg: 'Resume uploaded successfully', resumeUrl: fileUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
