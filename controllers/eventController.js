// Import Event model
const Event = require('../models/Event');

// Get all events for logged in user
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id }).sort({ date: 1 });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create new event for logged in user
const createEvent = async (req, res) => {
    try {
        const { title, date, time, category, description } = req.body;

        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date are required' });
        }

        const newEvent = await Event.create({
            title,
            date,
            time,
            category,
            description,
            userId: req.user.id
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update event
const updateEvent = async (req, res) => {
    try {
        const { title, date, time, category, description } = req.body;

        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            {
                title,
                date,
                time,
                category,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete event 
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, userId: req.user.id });

        // Check if event exists
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete event
        await event.deleteOne();

        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
