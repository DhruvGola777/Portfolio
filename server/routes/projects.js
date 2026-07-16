const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { mediaStorage } = require('../config/cloudinary');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { cacheMiddleware, clearCachePrefix } = require('../config/cache');

// Setup multer to use local disk storage first to handle large video files safely
const fs = require('fs');
const os = require('os');
const uploadDir = os.tmpdir();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
  }
});

const mediaUpload = multer({ storage: storage });
const { cloudinary } = require('../config/cloudinary');

// @route   GET /api/projects
// @desc    Get all projects (Public)
router.get('/', cacheMiddleware(), async (req, res) => {
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
router.get('/:id', cacheMiddleware(), async (req, res) => {
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
    clearCachePrefix('/api/projects');
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
    clearCachePrefix('/api/projects');
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
    clearCachePrefix('/api/projects');
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
    
    // Upload to Cloudinary using upload_large for large video files
    const result = await cloudinary.uploader.upload_large(req.file.path, {
      folder: 'portfolio/projects',
      resource_type: 'auto',
      chunk_size: 6000000 // 6MB chunks
    });
    
    // Delete local file
    try { fs.unlinkSync(req.file.path); } catch(e) {}

    let projectUpdated = false;
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (project) {
        project.mediaUrl = result.secure_url;
        await project.save();
        projectUpdated = true;
      }
    }
    if (projectUpdated) {
      clearCachePrefix('/api/projects');
    }
    
    res.json({ msg: 'Media uploaded successfully', mediaUrl: result.secure_url, projectUpdated });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({ msg: err.message || 'Server Error during upload' });
  }
});

// @route   POST /api/projects/upload-gallery
// @desc    Upload project gallery (Protected)
router.post('/upload-gallery', auth, mediaUpload.array('gallery', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No files uploaded' });
    }
    
    const fileUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload_large(file.path, {
        folder: 'portfolio/projects',
        resource_type: 'auto',
        chunk_size: 6000000
      });
      fileUrls.push(result.secure_url);
      
      // Delete local file
      try { fs.unlinkSync(file.path); } catch(e) {}
    }

    let projectUpdated = false;
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (project) {
        project.gallery = [...(project.gallery || []), ...fileUrls];
        await project.save();
        projectUpdated = true;
      }
    }
    if (projectUpdated) {
      clearCachePrefix('/api/projects');
    }
    
    res.json({ msg: 'Gallery uploaded successfully', galleryUrls: fileUrls, projectUpdated });
  } catch (err) {
    console.error("Cloudinary Gallery Upload Error:", err);
    res.status(500).json({ msg: err.message || 'Server Error during gallery upload' });
  }
});

module.exports = router;
