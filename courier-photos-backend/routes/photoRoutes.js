// routes/photoRoutes.js
const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo'); // Photo model

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Route to upload a photo
router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const { description } = req.body;
    const photo = new Photo({
      url: `/uploads/${req.file.filename}`,
      description,
    });
    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Error uploading photo', error });
  }
});

// Route to fetch all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json({ photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Error fetching photos', error });
  }
});

module.exports = router;
