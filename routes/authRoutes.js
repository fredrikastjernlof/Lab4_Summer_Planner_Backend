// Import packages and modules
const express = require('express');
const { registerUser, loginUser} = require('../controllers/authController');

// Create a router
const router = express.Router();

// Define router endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

// Export the router
module.exports = router;