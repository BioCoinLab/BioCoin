// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BioCoin
 * @dev ERC20 Token for BioCoin platform on Binance Smart Chain.
 * Enables data access payments and platform fee distribution.
 */
contract BioCoin is ERC20, Ownable, ReentrancyGuard {
    // Platform fee percentage (70% to data provider, 30% to platform)
    uint8 public constant PLATFORM_FEE_PERCENT = 30;
    
    // Platform wallet address for collecting fees
    address public platformWallet;
    
    // Data access payment events
    event DataAccessPayment(
        address indexed researcher, 
        address indexed dataProvider, 
        uint256 amount, 
        uint256 providerShare, 
        uint256 platformShare,
        uint256 timestamp
    );
    
    /**
     * @dev Constructor for BioCoin
     * @param initialSupply Initial token supply (in smallest unit)
     * @param platformAddress Address to receive platform fees
     */
    constructor(
        uint256 initialSupply,
        address platformAddress
    ) ERC20("BioCoin", "BIO") {
        require(platformAddress != address(0), "Platform address cannot be zero");
        
        platformWallet = platformAddress;
        _mint(msg.sender, initialSupply);
    }
    
    /**
     * @dev Change the platform wallet address
     * @param newPlatformWallet New platform wallet address
     */
    function updatePlatformWallet(address newPlatformWallet) external onlyOwner {
        require(newPlatformWallet != address(0), "Platform address cannot be zero");
        platformWallet = newPlatformWallet;
    }
    
    /**
     * @dev Process payment for data access
     * @param dataProvider Address of the data provider
     * @param amount Amount to pay for data access
     * @return bool Success status
     */
    function payForDataAccess(address dataProvider, uint256 amount) external nonReentrant returns (bool) {
        require(dataProvider != address(0), "Data provider address cannot be zero");
        require(amount > 0, "Payment amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Calculate shares
        uint256 platformShare = (amount * PLATFORM_FEE_PERCENT) / 100;
        uint256 providerShare = amount - platformShare;
        
        // Transfer shares
        _transfer(msg.sender, dataProvider, providerShare);
        _transfer(msg.sender, platformWallet, platformShare);
        
        // Emit event
        emit DataAccessPayment(
            msg.sender,
            dataProvider,
            amount,
            providerShare,
            platformShare,
            block.timestamp
        );
        
        return true;
    }
    
    /**
     * @dev Get platform fee distribution info
     * @param amount The transaction amount
     * @return providerShare Amount that goes to the data provider
     * @return platformShare Amount that goes to the platform
     */
    function calculateFeeDistribution(uint256 amount) public pure returns (uint256 providerShare, uint256 platformShare) {
        platformShare = (amount * PLATFORM_FEE_PERCENT) / 100;
        providerShare = amount - platformShare;
        return (providerShare, platformShare);
    }
} 