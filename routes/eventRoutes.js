// Import packages, middleware and controllers
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// Protected event routes
router.get('/', authMiddleware, getEvents);
router.post('/', authMiddleware, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// Export router
module.exports = router;