// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Middelware to verify JWT
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if authorization header exists
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        // Extract token from header
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user data from token on request
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }

};

// Export middleware
module.exports = authMiddleware;