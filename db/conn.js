const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/spotfinderDB';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
