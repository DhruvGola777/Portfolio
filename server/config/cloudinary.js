const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage for Resume (PDFs, docs, etc.)
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/resumes',
    allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: 'raw' // needed for non-image files in some cases, or auto
  }
});

// Storage for Project Images
const mediaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/projects',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
  }
});

module.exports = {
  cloudinary,
  resumeStorage,
  mediaStorage
};
