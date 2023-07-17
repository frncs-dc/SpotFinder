const mongoose = require('mongoose');

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
  profilepictue: {
    type: Image,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);