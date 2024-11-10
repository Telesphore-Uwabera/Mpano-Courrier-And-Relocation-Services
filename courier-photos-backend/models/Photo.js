const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, required: false },
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
