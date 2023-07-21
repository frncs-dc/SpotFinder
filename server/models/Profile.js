const mongoose = require('mongoose');
const fs = require('fs');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true
  },
  profilepicture: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);

// Convert image to base64
function imageToBase64(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  return imageData.toString('base64');
}