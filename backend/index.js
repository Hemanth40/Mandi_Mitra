require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/';
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import auth routes
const authRoutes = require('./routes/auth');
const commodityRoutes = require('./routes/commodity');
const weatherRoutes = require('./routes/weather');

// Basic route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/commodity', commodityRoutes);
app.use('/api/weather', weatherRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
