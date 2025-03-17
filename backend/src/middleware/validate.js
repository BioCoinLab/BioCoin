/**
 * Middleware for validating requests using Joi schemas
 */

/**
 * Creates a validation middleware for a specific Joi schema
 * @param {Object} schema - Joi schema to validate against
 * @param {string} property - Request property to validate (body, params, query)
 * @returns {Function} Express middleware function
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      return next();
    }

    const errorMessages = error.details.map(detail => ({
      message: detail.message,
      path: detail.path,
    }));

    return res.status(400).json({
      error: 'Validation error',
      details: errorMessages,
    });
  };
};

module.exports = validate; 