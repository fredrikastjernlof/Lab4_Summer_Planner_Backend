// Import packages and modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');
const Todo = require('../models/Todo');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created',
            user: {
                id: newUser._id,
                username: newUser.username,
                createdAt: newUser.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            });

        //Send response
        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

// Delete the logged in user's account and all related data
const deleteAccount = async (req, res) => {
    try {
        await Event.deleteMany({ userId: req.user.id });
        await Todo.deleteMany({ userId: req.user.id });
        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({
            message: 'Account deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not delete account'
        });
    }
};

// Export functions
module.exports = {
    registerUser,
    loginUser,
    deleteAccount
};