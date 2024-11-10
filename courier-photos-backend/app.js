const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up storage engine for multer to save uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save files to 'uploads' folder
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use original file name and ensure it doesn't overwrite existing files
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Static files (like photos.html) can be served from the root or a public folder
app.use(express.static('public'));

// Photo upload route
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // After uploading, redirect to photos.html
  res.redirect('/photos.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
