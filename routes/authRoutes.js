// Import packages and modules
const express = require('express');
const { registerUser } = require('../controllers/authController');

// Create a router
const router = express.Router();

// Define router endpoints
router.post('/register', registerUser);

// Export the router
module.exports = router;