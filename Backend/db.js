const mongoose = require('mongoose');
require('dotenv').config();
 
mongoose.Promise = global.Promise;

const connectToMongo = async () => {
  // Connect MongoDB at default port 27017.
  mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
  }, (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection: ' + err);
    }
  });
};

module.exports = connectToMongo;
