// Import packages and modules
const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

// Import database connection
const connectDB = require('./db_connection');

// Expressinstance
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors()); //Allows cross-origin requests
app.use(express.json()); //Allows parsing of JSON bodies in requests
app.use('/api/auth', authRoutes); //Auth route for authentication endpoints
app.use('/api/events', eventRoutes); //Event route for protected endpoints
app.use('/api/todos', require('./routes/todoRoutes')); // ToDo route for protected endpoints

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});