/**
 * Joi validation schemas for API requests
 */
const Joi = require('joi');

// User validation schemas
const userSchema = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(100).required(),
    walletAddress: Joi.string().optional()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    walletAddress: Joi.string().optional(),
    bio: Joi.string().max(500).optional()
  })
};

// Data validation schemas
const dataSchema = {
  create: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).required(),
    dataType: Joi.string().valid('microbiome', 'genetic', 'clinical').required(),
    isPublic: Joi.boolean().default(false),
    price: Joi.number().min(0).required()
  }),
  
  update: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    isPublic: Joi.boolean().optional(),
    price: Joi.number().min(0).optional()
  })
};

// Research validation schemas
const researchSchema = {
  create: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().required(),
    requestedDataTypes: Joi.array().items(
      Joi.string().valid('microbiome', 'genetic', 'clinical')
    ).min(1).required(),
    budget: Joi.number().min(0).required(),
    duration: Joi.number().min(1).required() // Duration in days
  }),
  
  update: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().optional(),
    budget: Joi.number().min(0).optional(),
    duration: Joi.number().min(1).optional(),
    status: Joi.string().valid('draft', 'open', 'in_progress', 'completed', 'cancelled').optional()
  })
};

// Transaction validation schemas
const transactionSchema = {
  create: Joi.object({
    dataId: Joi.string().required(),
    amount: Joi.number().min(0).required(),
    blockchain: Joi.string().valid('solana', 'bsc').required()
  })
};

// Pagination validation schema (for query parameters)
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').default('desc')
});

module.exports = {
  userSchema,
  dataSchema,
  researchSchema,
  transactionSchema,
  paginationSchema
}; 