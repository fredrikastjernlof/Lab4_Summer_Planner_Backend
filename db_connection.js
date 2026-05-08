// Import moongoose and dotenv
const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDB function
module.exports = connectDB;