// Import mongoose
const mongoose = require('mongoose');

// Define ToDo schema
const ToDoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Create ToDo model
const ToDo = mongoose.model('ToDo', ToDoSchema);

// Export model
module.exports = ToDo;