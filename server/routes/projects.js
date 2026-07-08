const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { mediaStorage } = require('../config/cloudinary');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Setup multer for project media using Cloudinary
const mediaUpload = multer({ storage: mediaStorage });

// @route   GET /api/projects
// @desc    Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project (Public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/projects
// @desc    Add new project (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/projects/upload-media
// @desc    Upload project media (Protected)
router.post('/upload-media', auth, mediaUpload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
    const fileUrl = req.file.path;
    res.json({ msg: 'Media uploaded successfully', mediaUrl: fileUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/projects/upload-gallery
// @desc    Upload project gallery (Protected)
router.post('/upload-gallery', auth, mediaUpload.array('gallery', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No files uploaded' });
    }
    
    const fileUrls = req.files.map(file => file.path);
    res.json({ msg: 'Gallery uploaded successfully', galleryUrls: fileUrls });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
