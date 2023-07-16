const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address__region: {
    type: String,
    required: true
  },
  address__city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isAssignedParking: {
    type: Boolean,
    required: true
  },
  total_capacity: {
    type: int,
    required: true
  },
  floors: {
    type: int,
    required: true
  },
  isCarSupported: {
    type: Boolean,
    required: true
  },
  isMotorSupported: {
    type: Boolean,
    required: true
  },
  isBikeSupported: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('User', UserSchema);