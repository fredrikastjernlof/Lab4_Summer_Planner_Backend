// Import packages, middleware and controllers
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getEvents, createEvent, deleteEvent } = require('../controllers/eventController');

// Protected event routes
router.get('/', authMiddleware, getEvents);
router.post('/', authMiddleware, createEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// Export router
module.exports = router;