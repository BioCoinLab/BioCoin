/**
 * Logger utility based on Winston
 */
const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'biocoin-api' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
          return `${timestamp} [${service}] ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      )
    }),
    
    // File transport for production logging
    new winston.transports.File({ 
      filename: path.join(process.env.LOG_DIR || 'logs', 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(process.env.LOG_DIR || 'logs', 'combined.log') 
    })
  ]
});

// Add stream for Morgan integration
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = logger; 