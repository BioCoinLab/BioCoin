/**
 * Rate limiting middleware configurations
 */
const rateLimit = require('express-rate-limit');

// Default rate limiter for general API endpoints
const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  }
});

// More restrictive limiter for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '1 hour'
  }
});

// Limiter for blockchain transaction endpoints
const transactionLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // limit each IP to 20 transactions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many transaction requests, please try again later.',
    retryAfter: '5 minutes'
  }
});

module.exports = {
  defaultLimiter,
  authLimiter,
  transactionLimiter
}; 