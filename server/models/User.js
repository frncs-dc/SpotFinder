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
    required: true,
    unique: true
  },
  lastname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  profilepicture: {
    type: String,
  },
  bio: {
    type: String,
  } 
});

module.exports = mongoose.model('User', UserSchema);