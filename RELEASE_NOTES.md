# BioCoin v1.01 Release Notes

## Overview
BioCoin v1.01 introduces significant backend enhancements focusing on API robustness, security, and multi-chain support. This release adds request validation, pagination, monitoring capabilities, and expands blockchain support to include Binance Smart Chain alongside Solana.

## Key Features

### Multi-Chain Support
- **Binance Smart Chain Integration** - BioCoin now supports both Solana and BSC, expanding market reach
- **Chain-Agnostic API** - Transaction endpoints work seamlessly across both blockchains
- **Multi-Wallet Balance Checking** - Users can view balances across multiple blockchains

### Backend Improvements
- **Request Validation** - All API endpoints now validate request data using Joi
- **Pagination** - List endpoints support standardized pagination parameters
- **Rate Limiting** - Protection against API abuse with tiered rate limits
- **Health Monitoring** - New endpoints for system status and performance metrics
- **Improved Logging** - Enhanced logging with Winston for better debugging

## Files Added

### Middleware
- `backend/src/middleware/validate.js` - Request validation middleware using Joi
- `backend/src/middleware/paginate.js` - API pagination middleware
- `backend/src/middleware/rateLimit.js` - Rate limiting for API security

### Utilities
- `backend/src/utils/validationSchemas.js` - Joi schemas for request validation
- `backend/src/utils/logger.js` - Winston logger implementation

### Routes
- `backend/src/routes/healthRoutes.js` - Health check endpoints
- `backend/src/routes/transactionRoutes.js` - Transaction API routes

### Controllers
- `backend/src/controllers/transactionController.js` - Transaction business logic

### Services
- `backend/src/services/blockchainService.js` - Multi-chain blockchain service

### Smart Contracts
- `contracts/src/BioCoinBSC.sol` - Solidity contract for Binance Smart Chain

## Files Modified
- `backend/package.json` - Added new dependencies
- `backend/.env.example` - Added BSC configuration variables
- `backend/src/index.js` - Updated core server configuration

## Technical Details

### API Endpoints
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system information
- `POST /api/transactions/payment` - Process payments (now supports blockchain selection)
- `GET /api/transactions/balances` - Get balances across blockchains

### Environment Configuration
New environment variables:
```
BSC_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
BSC_CONTRACT_ADDRESS=your_bsc_contract_address
```

### Validation Schemas
All API endpoints now validate requests with properly defined schemas:
- User schemas (register, login, update)
- Data schemas (create, update)
- Research schemas (create, update)
- Transaction schemas (payment processing)

## Frontend Compatibility
These backend changes are fully compatible with the existing frontend. The blockchain service allows users to choose between Solana and BSC when making transactions. 