const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  username: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  post__picture: {
    type: String
  },
  post__description: {
    type: String,
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
  // isAssignedParking: {
  //   type: Boolean,
  //   required: true
  // },
  total_capacity: {
    type: Number,
    required: true
  },
  floors: {
    type: Number,
    required: true
  },
  parking_capacity: {
    type: [
      {
        available: {type: Number}
      }
    ],
  },
  // isCarSupported: {
  //   type: Boolean,
  // },
  // isMotorSupported: {
  //   type: Boolean,
  // },
  // isBikeSupported: {
  //   type: Boolean,
  // },
  /*map_file: {
    filename: String,
    data: Buffer,
    contentType: String,
    required: true
  },*/
  flat__amount: {
    type: Decimal128
  },
  flat__hours: {
    type: Number
  },
  hour__amount: {
    type: Decimal128
  },
  hour__hours: {
    type: Number
  }
});

module.exports = mongoose.model('Post', PostSchema);