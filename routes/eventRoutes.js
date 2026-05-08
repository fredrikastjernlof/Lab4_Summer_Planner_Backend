// Import packages, middleware and controllers
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getEvents, createEvent } = require('../controllers/eventController');

// Protected event routes
router.get('/', authMiddleware, getEvents);
router.post('/', authMiddleware, createEvent);

// Export router
module.exports = router;