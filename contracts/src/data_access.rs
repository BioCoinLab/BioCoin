use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod biocoin_data_access {
    use super::*;

    pub fn register_data(
        ctx: Context<RegisterData>,
        data_hash: String,
        data_type: String,
        description: String,
        price: u64,
    ) -> Result<()> {
        let data_record = &mut ctx.accounts.data_record;
        let owner = &ctx.accounts.owner;

        data_record.owner = *owner.key;
        data_record.data_hash = data_hash;
        data_record.data_type = data_type;
        data_record.description = description;
        data_record.price = price;
        data_record.is_available = true;
        data_record.access_count = 0;
        data_record.created_at = Clock::get()?.unix_timestamp;
        data_record.updated_at = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn update_data_price(
        ctx: Context<UpdateDataPrice>,
        new_price: u64,
    ) -> Result<()> {
        let data_record = &mut ctx.accounts.data_record;
        
        // Ensure only the owner can update the price
        require!(
            data_record.owner == *ctx.accounts.owner.key,
            DataAccessError::Unauthorized
        );

        data_record.price = new_price;
        data_record.updated_at = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn toggle_data_availability(
        ctx: Context<ToggleDataAvailability>,
    ) -> Result<()> {
        let data_record = &mut ctx.accounts.data_record;
        
        // Ensure only the owner can toggle availability
        require!(
            data_record.owner == *ctx.accounts.owner.key,
            DataAccessError::Unauthorized
        );

        data_record.is_available = !data_record.is_available;
        data_record.updated_at = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn request_data_access(
        ctx: Context<RequestDataAccess>,
        purpose: String,
        duration_days: u16,
    ) -> Result<()> {
        let data_record = &ctx.accounts.data_record;
        let access_request = &mut ctx.accounts.access_request;
        let requester = &ctx.accounts.requester;
        
        // Ensure data is available
        require!(
            data_record.is_available,
            DataAccessError::DataNotAvailable
        );

        access_request.data_record = *ctx.accounts.data_record.to_account_info().key;
        access_request.requester = *requester.key;
        access_request.owner = data_record.owner;
        access_request.purpose = purpose;
        access_request.duration_days = duration_days;
        access_request.status = AccessStatus::Pending;
        access_request.requested_at = Clock::get()?.unix_timestamp;
        access_request.approved_at = 0;
        access_request.expires_at = 0;

        Ok(())
    }

    pub fn approve_data_access(
        ctx: Context<ApproveDataAccess>,
    ) -> Result<()> {
        let data_record = &mut ctx.accounts.data_record;
        let access_request = &mut ctx.accounts.access_request;
        
        // Ensure only the data owner can approve access
        require!(
            data_record.owner == *ctx.accounts.owner.key,
            DataAccessError::Unauthorized
        );
        
        // Ensure the request is pending
        require!(
            access_request.status == AccessStatus::Pending,
            DataAccessError::InvalidRequestStatus
        );

        let now = Clock::get()?.unix_timestamp;
        let expires_at = now + (access_request.duration_days as i64 * 86400); // 86400 seconds in a day

        access_request.status = AccessStatus::Approved;
        access_request.approved_at = now;
        access_request.expires_at = expires_at;

        // Increment access count
        data_record.access_count += 1;
        data_record.updated_at = now;

        Ok(())
    }

    pub fn deny_data_access(
        ctx: Context<DenyDataAccess>,
        reason: String,
    ) -> Result<()> {
        let data_record = &ctx.accounts.data_record;
        let access_request = &mut ctx.accounts.access_request;
        
        // Ensure only the data owner can deny access
        require!(
            data_record.owner == *ctx.accounts.owner.key,
            DataAccessError::Unauthorized
        );
        
        // Ensure the request is pending
        require!(
            access_request.status == AccessStatus::Pending,
            DataAccessError::InvalidRequestStatus
        );

        access_request.status = AccessStatus::Denied;
        access_request.denial_reason = Some(reason);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterData<'info> {
    #[account(init, payer = owner, space = 8 + DataRecord::LEN)]
    pub data_record: Account<'info, DataRecord>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateDataPrice<'info> {
    #[account(mut)]
    pub data_record: Account<'info, DataRecord>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct ToggleDataAvailability<'info> {
    #[account(mut)]
    pub data_record: Account<'info, DataRecord>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct RequestDataAccess<'info> {
    pub data_record: Account<'info, DataRecord>,
    #[account(init, payer = requester, space = 8 + AccessRequest::LEN)]
    pub access_request: Account<'info, AccessRequest>,
    #[account(mut)]
    pub requester: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ApproveDataAccess<'info> {
    #[account(mut)]
    pub data_record: Account<'info, DataRecord>,
    #[account(mut)]
    pub access_request: Account<'info, AccessRequest>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct DenyDataAccess<'info> {
    pub data_record: Account<'info, DataRecord>,
    #[account(mut)]
    pub access_request: Account<'info, AccessRequest>,
    pub owner: Signer<'info>,
}

#[account]
pub struct DataRecord {
    pub owner: Pubkey,
    pub data_hash: String,
    pub data_type: String,
    pub description: String,
    pub price: u64,
    pub is_available: bool,
    pub access_count: u32,
    pub created_at: i64,
    pub updated_at: i64,
}

impl DataRecord {
    pub const LEN: usize = 32 + 64 + 32 + 256 + 8 + 1 + 4 + 8 + 8;
}

#[account]
pub struct AccessRequest {
    pub data_record: Pubkey,
    pub requester: Pubkey,
    pub owner: Pubkey,
    pub purpose: String,
    pub duration_days: u16,
    pub status: AccessStatus,
    pub requested_at: i64,
    pub approved_at: i64,
    pub expires_at: i64,
    pub denial_reason: Option<String>,
}

impl AccessRequest {
    pub const LEN: usize = 32 + 32 + 32 + 256 + 2 + 1 + 8 + 8 + 8 + 128;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum AccessStatus {
    Pending,
    Approved,
    Denied,
    Expired,
}

#[error_code]
pub enum DataAccessError {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
    #[msg("The data is not available for access")]
    DataNotAvailable,
    #[msg("Invalid request status for this operation")]
    InvalidRequestStatus,
} 