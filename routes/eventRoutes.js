// Import packages, middleware and controllers
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProtectedData } = require('../controllers/eventControllers');

// Protected route
router.get('/', authMiddleware, getProtectedData);

// Export router
module.exports = router;