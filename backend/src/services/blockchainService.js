/**
 * Service for blockchain operations (Solana and Binance Smart Chain)
 */
const Web3 = require('web3');
const solanaWeb3 = require('@solana/web3.js');
const logger = require('../utils/logger');

// Blockchain configuration from environment variables
const config = {
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    programId: process.env.SOLANA_PROGRAM_ID
  },
  bsc: {
    rpcUrl: process.env.BSC_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    contractAddress: process.env.BSC_CONTRACT_ADDRESS
  }
};

// Initialize Solana connection
const getSolanaConnection = () => {
  try {
    return new solanaWeb3.Connection(config.solana.rpcUrl);
  } catch (error) {
    logger.error('Failed to initialize Solana connection', { error });
    throw error;
  }
};

// Initialize BSC connection using Web3
const getBscWeb3 = () => {
  try {
    return new Web3(new Web3.providers.HttpProvider(config.bsc.rpcUrl));
  } catch (error) {
    logger.error('Failed to initialize BSC Web3 connection', { error });
    throw error;
  }
};

// BioCoin token ABIs for BSC
const bioCoinAbi = [
  // Basic ERC20 methods
  {
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Data access payment method
  {
    "inputs": [
      { "name": "dataProvider", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "payForDataAccess",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Get BioCoin contract instance for BSC
const getBioCoinContract = (web3) => {
  try {
    return new web3.eth.Contract(bioCoinAbi, config.bsc.contractAddress);
  } catch (error) {
    logger.error('Failed to initialize BioCoin contract', { error });
    throw error;
  }
};

// Get account balance on Solana
const getSolanaBalance = async (walletAddress) => {
  try {
    const connection = getSolanaConnection();
    const pubkey = new solanaWeb3.PublicKey(walletAddress);
    const balance = await connection.getBalance(pubkey);
    return balance / solanaWeb3.LAMPORTS_PER_SOL;
  } catch (error) {
    logger.error('Failed to get Solana balance', { error, walletAddress });
    throw error;
  }
};

// Get token balance on BSC
const getBscTokenBalance = async (walletAddress) => {
  try {
    const web3 = getBscWeb3();
    const contract = getBioCoinContract(web3);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    logger.error('Failed to get BSC token balance', { error, walletAddress });
    throw error;
  }
};

// Process payment for data access on Solana
const processPaymentSolana = async (payerWallet, dataProviderWallet, amount) => {
  // In a real implementation, this would use Solana transactions to call the program
  logger.info('Processing Solana payment', { payer: payerWallet, provider: dataProviderWallet, amount });
  
  // For this example, we're just returning a mock transaction ID
  return {
    success: true,
    transactionId: `sol_${Date.now()}`,
    amount,
    timestamp: new Date().toISOString()
  };
};

// Process payment for data access on BSC
const processPaymentBsc = async (payerWallet, payerPrivateKey, dataProviderWallet, amount) => {
  try {
    const web3 = getBscWeb3();
    const contract = getBioCoinContract(web3);
    
    // Convert amount to wei
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    
    // Create transaction
    const tx = contract.methods.payForDataAccess(dataProviderWallet, amountInWei);
    
    // Get gas price and estimate gas
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await tx.estimateGas({ from: payerWallet });
    
    // Sign and send transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: config.bsc.contractAddress,
        data: tx.encodeABI(),
        gas: gasLimit,
        gasPrice
      },
      payerPrivateKey
    );
    
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return {
      success: true,
      transactionId: receipt.transactionHash,
      amount,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Failed to process BSC payment', { error, payer: payerWallet, provider: dataProviderWallet });
    return {
      success: false,
      error: error.message
    };
  }
};

// Process payment based on blockchain type
const processPayment = async (blockchain, payerInfo, dataProviderWallet, amount) => {
  try {
    switch (blockchain.toLowerCase()) {
      case 'solana':
        return await processPaymentSolana(payerInfo.walletAddress, dataProviderWallet, amount);
      
      case 'bsc':
        return await processPaymentBsc(
          payerInfo.walletAddress, 
          payerInfo.privateKey, 
          dataProviderWallet, 
          amount
        );
        
      default:
        throw new Error(`Unsupported blockchain: ${blockchain}`);
    }
  } catch (error) {
    logger.error('Payment processing failed', { error, blockchain });
    throw error;
  }
};

// Get balance across multiple blockchains
const getBalances = async (walletAddresses) => {
  const { solanaAddress, bscAddress } = walletAddresses;
  const balances = {};
  
  if (solanaAddress) {
    try {
      balances.solana = await getSolanaBalance(solanaAddress);
    } catch (error) {
      balances.solana = { error: error.message };
    }
  }
  
  if (bscAddress) {
    try {
      balances.bsc = await getBscTokenBalance(bscAddress);
    } catch (error) {
      balances.bsc = { error: error.message };
    }
  }
  
  return balances;
};

module.exports = {
  processPayment,
  getBalances,
  getSolanaBalance,
  getBscTokenBalance
}; 