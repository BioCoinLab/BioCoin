/**
 * Controller for handling transaction-related operations
 */
const blockchainService = require('../services/blockchainService');
const logger = require('../utils/logger');

/**
 * Process a data access payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const processPayment = async (req, res) => {
  try {
    const { dataId, amount, blockchain } = req.body;
    const userId = req.user.id; // Assuming auth middleware sets the user

    // In a real application, you would:
    // 1. Fetch the data provider's info from the database
    // 2. Verify that the user has permission to access the data
    // 3. Process the payment and record it

    // Mock data provider for example
    const dataProvider = {
      id: 'provider123',
      walletAddress: {
        solana: 'provider_solana_wallet_address',
        bsc: '0xProviderBscAddress'
      }
    };

    // Mock user wallet info - in reality, this should be secured properly
    const userWalletInfo = {
      walletAddress: req.user.walletAddress[blockchain] || 'demo_wallet_address',
      privateKey: process.env.DEMO_PRIVATE_KEY // Only for demonstration!
    };

    // Process the payment on the selected blockchain
    const paymentResult = await blockchainService.processPayment(
      blockchain,
      userWalletInfo,
      dataProvider.walletAddress[blockchain],
      amount
    );

    if (paymentResult.success) {
      // In a real app, save the transaction to the database
      logger.info('Payment processed successfully', { 
        userId, 
        dataId, 
        transactionId: paymentResult.transactionId 
      });

      return res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        transaction: {
          id: paymentResult.transactionId,
          amount,
          timestamp: paymentResult.timestamp,
          blockchain
        }
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Payment processing failed',
      error: paymentResult.error
    });
  } catch (error) {
    logger.error('Error processing payment', { error: error.message });
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get user wallet balances across blockchains
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBalances = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming auth middleware sets the user

    // In real application, you would get user's wallet addresses from database
    const walletAddresses = {
      solanaAddress: req.user.walletAddress?.solana,
      bscAddress: req.user.walletAddress?.bsc
    };

    const balances = await blockchainService.getBalances(walletAddresses);

    return res.status(200).json({
      success: true,
      balances
    });
  } catch (error) {
    logger.error('Error getting balances', { error: error.message });
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve wallet balances',
      error: error.message  
    });
  }
};

module.exports = {
  processPayment,
  getBalances
}; 