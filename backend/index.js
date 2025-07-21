require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Enable file uploads - MUST be before routes
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  abortOnLimit: true,
  useTempFiles: false, // Keep files in memory instead of temp files
  createParentPath: true
}));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mandi_mitra';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Import routes
const authRoutes = require('./routes/auth');
const commodityRoutes = require('./routes/commodity');
const weatherRoutes = require('./routes/weather');
const newsRoutes = require('./routes/news');
const cropDoctorRoutes = require('./routes/cropDoctor');

// Basic route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/commodity', commodityRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/crop-doctor', cropDoctorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message 
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
