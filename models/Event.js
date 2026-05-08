// Import mongoose
const mongoose = require('mongoose');

// Define event schema
const eventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: {
        type: String,
    },
    category: {
        type: String,
        default: 'personal'
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Create event model
const Event = mongoose.model('Event', eventSchema);

// Export model
module.exports = Event;