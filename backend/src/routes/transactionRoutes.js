/**
 * Routes for transaction operations
 */
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const validate = require('../middleware/validate');
const { transactionSchema } = require('../utils/validationSchemas');
const { transactionLimiter } = require('../middleware/rateLimit');

/**
 * @route POST /api/transactions/payment
 * @desc Process a payment for data access
 * @access Private
 */
router.post(
  '/payment',
  transactionLimiter,
  validate(transactionSchema.create),
  transactionController.processPayment
);

/**
 * @route GET /api/transactions/balances
 * @desc Get wallet balances across blockchains
 * @access Private
 */
router.get(
  '/balances',
  transactionController.getBalances
);

module.exports = router; 