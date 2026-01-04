const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. CONFIG MUST BE HERE (Before routes)
dotenv.config();

// 2. NOW import routes (So they get the loaded keys)
const memberRoutes = require('./routes/members');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.static('public')); // This serves your HTML form
app.use(express.json());

// Database Connection
app.use(async (req, res, next) => {
  try {
    await connectDB(); // Wait for DB to be ready
    next(); // Continue to the routes
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use('/api/members', memberRoutes);

app.get('/', (req, res) => {
  res.send('CodeChef WCE API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});