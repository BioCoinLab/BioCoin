use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod biocoin_token {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        name: String,
        symbol: String,
        decimals: u8,
        total_supply: u64,
    ) -> Result<()> {
        let token_program = &ctx.accounts.token_program;
        let mint = &ctx.accounts.mint;
        let token_account = &ctx.accounts.token_account;
        let authority = &ctx.accounts.authority;
        let rent = &ctx.accounts.rent;

        // Initialize the mint
        token::initialize_mint(
            CpiContext::new(
                token_program.to_account_info(),
                token::InitializeMint {
                    mint: mint.to_account_info(),
                    rent: rent.to_account_info(),
                },
            ),
            decimals,
            authority.key,
            Some(authority.key),
        )?;

        // Initialize the token account
        token::initialize_account(
            CpiContext::new(
                token_program.to_account_info(),
                token::InitializeAccount {
                    account: token_account.to_account_info(),
                    mint: mint.to_account_info(),
                    authority: authority.to_account_info(),
                    rent: rent.to_account_info(),
                },
            ),
        )?;

        // Mint tokens to the token account
        token::mint_to(
            CpiContext::new(
                token_program.to_account_info(),
                token::MintTo {
                    mint: mint.to_account_info(),
                    to: token_account.to_account_info(),
                    authority: authority.to_account_info(),
                },
            ),
            total_supply,
        )?;

        // Store token metadata
        let token_info = &mut ctx.accounts.token_info;
        token_info.name = name;
        token_info.symbol = symbol;
        token_info.decimals = decimals;
        token_info.total_supply = total_supply;
        token_info.authority = *authority.key;

        Ok(())
    }

    pub fn transfer(
        ctx: Context<Transfer>,
        amount: u64,
    ) -> Result<()> {
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.from.to_account_info(),
                    to: ctx.accounts.to.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            amount,
        )?;

        Ok(())
    }

    pub fn data_access_payment(
        ctx: Context<DataAccessPayment>,
        amount: u64,
    ) -> Result<()> {
        let provider_share = (amount * 70) / 100; // 70% to data provider
        let platform_share = amount - provider_share; // 30% to platform

        // Transfer to data provider
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.researcher.to_account_info(),
                    to: ctx.accounts.data_provider.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            provider_share,
        )?;

        // Transfer to platform
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.researcher.to_account_info(),
                    to: ctx.accounts.platform.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            platform_share,
        )?;

        // Record the transaction
        let transaction_record = &mut ctx.accounts.transaction_record;
        transaction_record.researcher = *ctx.accounts.researcher.to_account_info().key;
        transaction_record.data_provider = *ctx.accounts.data_provider.to_account_info().key;
        transaction_record.amount = amount;
        transaction_record.provider_share = provider_share;
        transaction_record.platform_share = platform_share;
        transaction_record.timestamp = Clock::get()?.unix_timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + TokenInfo::LEN)]
    pub token_info: Account<'info, TokenInfo>,
    pub mint: Account<'info, Mint>,
    pub token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub from: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct DataAccessPayment<'info> {
    #[account(mut)]
    pub researcher: Account<'info, TokenAccount>,
    #[account(mut)]
    pub data_provider: Account<'info, TokenAccount>,
    #[account(mut)]
    pub platform: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    #[account(init, payer = authority, space = 8 + TransactionRecord::LEN)]
    pub transaction_record: Account<'info, TransactionRecord>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: u64,
    pub authority: Pubkey,
}

impl TokenInfo {
    pub const LEN: usize = 32 + 8 + 4 + 32 + 1 + 8 + 32;
}

#[account]
pub struct TransactionRecord {
    pub researcher: Pubkey,
    pub data_provider: Pubkey,
    pub amount: u64,
    pub provider_share: u64,
    pub platform_share: u64,
    pub timestamp: i64,
}

impl TransactionRecord {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 8 + 8;
} 