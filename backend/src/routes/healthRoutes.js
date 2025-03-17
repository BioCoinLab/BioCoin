/**
 * Health check routes for monitoring the API
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const os = require('os');

// Simple health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'BioCoin API'
  });
});

// Detailed health check with system information
router.get('/detailed', (req, res) => {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'BioCoin API',
    version: process.env.npm_package_version || '0.1.0',
    uptime: Math.floor(process.uptime()) + ' seconds',
    hostname: os.hostname(),
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    },
    memory: {
      free: Math.round(os.freemem() / 1024 / 1024) + 'MB',
      total: Math.round(os.totalmem() / 1024 / 1024) + 'MB'
    },
    cpu: {
      load: os.loadavg(),
      cores: os.cpus().length
    }
  };

  res.status(200).json(healthData);
});

module.exports = router; 