require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const logger = require('./utils/logger');
const { defaultLimiter } = require('./middleware/rateLimit');
const { paginate } = require('./middleware/paginate');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
// Uncomment as routes are implemented
// const userRoutes = require('./routes/userRoutes');
// const dataRoutes = require('./routes/dataRoutes');
// const researchRoutes = require('./routes/researchRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create logs directory if it doesn't exist
const logsDir = process.env.LOG_DIR || path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Basic security middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging with Morgan, streaming to Winston
app.use(morgan('combined', { stream: logger.stream }));

// Apply rate limiting to all routes
app.use(defaultLimiter);

// Apply pagination middleware to all routes
app.use(paginate());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to BioCoin API v1.01',
    documentation: '/api-docs',
    health: '/health'
  });
});

// API routes
app.use('/health', healthRoutes);
app.use('/api/transactions', transactionRoutes);
// Uncomment as routes are implemented
// app.use('/api/users', userRoutes);
// app.use('/api/data', dataRoutes);
// app.use('/api/research', researchRoutes);

// Connect to MongoDB if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => logger.info('Connected to MongoDB'))
    .catch((err) => logger.error('MongoDB connection error:', { error: err.message }));
} else {
  logger.warn('MONGODB_URI not provided, skipping database connection');
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', { error: err.message, stack: err.stack });
  
  res.status(err.status || 500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  logger.info(`Supporting blockchains: Solana, Binance Smart Chain`);
});

module.exports = app; 