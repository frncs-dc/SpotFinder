const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    post_id:{
        type: mongoose.ObjectId
    },
    username: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: Date, 
        default: Date.now()
    },
    reviewBody: {
        type: String
    }
});

module.exports = mongoose.model('Review', ReviewSchema);