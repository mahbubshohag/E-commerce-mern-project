const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');
const connectDatabase = async (options={}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', (error) => {
      console.error(`DB connection error: ${error}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.toString());
  }
};

module.exports = connectDatabase;
