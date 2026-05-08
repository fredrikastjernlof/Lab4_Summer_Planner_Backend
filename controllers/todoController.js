// Import ToDo model
const ToDo = require('../models/Todo');

// Get ToDos for a logged in user
const getToDos = async (req, res) => {
    try {
        const todos = await ToDo.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create a new ToDo
const createToDo = async (req, res) => {
    try {
        const { text } = req.body;

        // Validate input
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const newToDo = await ToDo.create({
            text,
            userId: req.user.id
        });

        res.status(201).json(newToDo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a ToDo
const updateToDo = async (req, res) => {
    try {
        const { completed } = req.body;

        const todo = await ToDo.findByIdAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            {
                completed
            },
            {
                new: true
            }
        );

        if (!todo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a ToDo
const deleteToDo = async (req, res) => {
    try {
        const todo = await ToDo.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        }); 

        if (!todo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }

        res.status(200).json({ message: 'ToDo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Export
module.exports = {
    getToDos,
    createToDo,
    updateToDo,
    deleteToDo
};