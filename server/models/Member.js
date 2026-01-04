const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearOfPassing: { type: Number, required: true },
  board: { 
    type: String, 
    required: true, 
    enum: ['Main', 'Assistant', 'Member', 'Mentor'] 
  },
  post: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Stores Cloudinary URL
  linkedin: { type: String },
  github: { type: String },
  codechef: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);