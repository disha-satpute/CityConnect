const express = require('express');
const cors = require('cors');
const app = express();
const adminRoutes = require('./routes/authRoutes');

// Environment variables (optional)
require('dotenv').config();

// Middlewares
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON

// API Routes
app.use('/api/admin', adminRoutes);

// Health check or root
app.get('/', (req, res) => {
  res.send('CityConnect backend running');
});

// Global error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
