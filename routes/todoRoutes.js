// Import packages, middleware and controllers
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { getToDos, createToDo, updateToDo, deleteToDo } = require('../controllers/todoController');

// Protected todo routes
router.get('/', authMiddleware, getToDos);
router.post('/', authMiddleware, createToDo);
router.put('/:id', authMiddleware, updateToDo);
router.delete('/:id', authMiddleware, deleteToDo);

module.exports = router;