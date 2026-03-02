const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const memberRoutes = require('./routes/members');

const app = express();

// --- 1. CORS & Middleware ---
app.use(cors({
  // Allow requests from your frontend domains or localhost
  origin: "*", 
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.static('public')); // Serves files from 'public' folder
app.use(express.json());

// --- 2. Database Connection Helper (Prevents Vercel Timeouts) ---
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log("✅ New MongoDB Connection Established");
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// Connect to DB before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// --- 3. Routes ---

// Serve the HTML Form at /register
// app.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// API Routes
app.use('/api/members', memberRoutes);

app.get('/', (req, res) => {
  res.send('CodeChef WCE API is running...');
});

// --- 4. Start Server (Local) or Export (Vercel) ---
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
