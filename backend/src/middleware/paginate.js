/**
 * Middleware for handling pagination in API responses
 */

/**
 * Creates a pagination middleware for list endpoints
 * @returns {Function} Express middleware function
 */
const paginate = () => {
  return (req, res, next) => {
    // Extract pagination parameters from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Ensure valid values
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 && limit <= 100 ? limit : 10;
    
    // Calculate skip value for database queries
    const skip = (validPage - 1) * validLimit;
    
    // Attach pagination info to request object
    req.pagination = {
      page: validPage,
      limit: validLimit,
      skip,
    };
    
    // Modify res.json to include pagination metadata
    const originalJson = res.json;
    res.json = function(data) {
      if (Array.isArray(data)) {
        // If the response is an array, wrap it with pagination metadata
        return originalJson.call(this, {
          data,
          pagination: {
            page: validPage,
            limit: validLimit,
            totalItems: data.length, // This should be replaced with actual total count
            totalPages: Math.ceil(data.length / validLimit),
            hasNextPage: data.length === validLimit,
            hasPrevPage: validPage > 1
          }
        });
      }
      
      // If it's already an object with pagination data
      if (data && data.data && data.pagination) {
        return originalJson.call(this, data);
      }
      
      // If it's not a list response, return original
      return originalJson.call(this, data);
    };
    
    next();
  };
};

/**
 * Helper function to create paginated response
 * @param {Array} data - The data array to paginate
 * @param {number} totalItems - Total number of items before pagination
 * @param {Object} pagination - Pagination parameters
 * @returns {Object} Paginated response object
 */
const paginatedResponse = (data, totalItems, pagination) => {
  const { page, limit } = pagination;
  
  return {
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      hasNextPage: page * limit < totalItems,
      hasPrevPage: page > 1
    }
  };
};

module.exports = {
  paginate,
  paginatedResponse
}; 