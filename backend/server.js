// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const authRoutes = require("./routes/auth")
const reportRoutes = require("./routes/reports")

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));




const templatePath = path.join(__dirname, '../backend/templates/health-fitness.html');
console.log('Exists?', fs.existsSync(templatePath));
console.log('Stats:', fs.existsSync(templatePath) ? fs.statSync(templatePath) : 'No file');
console.log('Path:', templatePath);

// Create required directories
const requiredDirs = [
  path.join(__dirname, 'generated-reports'),
  path.join(__dirname, 'data')
];

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Assessment Report Generation System'
  });
});

// Serve static files from generated reports
app.use('/api/reports/files', express.static(path.join(__dirname, 'generated-reports')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong on our end'
    });
  } else {
    res.status(500).json({ 
      error: err.message,
      stack: err.stack
    });
  }
});

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     error: 'Route not found',
//     message: `Cannot ${req.method} ${req.originalUrl}`
//   });
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📁 Reports directory: ${path.join(__dirname, 'generated-reports')}`);
  console.log(`🛠️  Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;