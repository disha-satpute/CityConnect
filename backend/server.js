const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db'); // Just to trigger DB connection

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/admin', require('./routes/adminAuthRoutes'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/complaints', require('./routes/complaints'));
app.use("/api/super", require("./routes/superRoutes"));



// Health check00000
app.get('/', (req, res) => {
  res.send('CityConnect backend running 🚀');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
