const { Decimal128 } = require('mongodb');
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
  post__picture: {
    data: Buffer,
    contentType: String
  },
  post__description: {
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
    type: Number,
    required: true
  },
  floors: {
    type: Number,
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
  /*map_file: {
    filename: String,
    data: Buffer,
    contentType: String,
    required: true
  },*/
  isFlatRate: {
    type: Boolean,
    required: true
  },
  flat__amount: {
    type: Decimal128,
    required: true
  },
  flat__hours: {
    type: Number,
    required: true
  },
  isFlatRate: {
    type: Boolean,
    required: true
  },
  flat__amount: {
    type: Decimal128,
    required: true
  },
  flat__hours: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);