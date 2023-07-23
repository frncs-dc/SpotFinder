const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
  mobileNo: {
    type: Number,
    required: true,
    unique: true
  },
  profilepicture: {
    type: String,
  },
  bio: {
    type: String,
    required: true
  } 
});

module.exports = mongoose.model('User', UserSchema);