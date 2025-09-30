require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./src/config/db');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Connect Database
connectDB();

// Routes
app.use('/api/books', require('./src/routes/bookRoutes'));
app.use('/api/students', require('./src/routes/studentRoutes'));
app.use('/api/borrow', require('./src/routes/borrowRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
