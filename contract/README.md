# RefundableToken Smart Contract

## Overview

RefundableToken is an ERC20-compliant token contract with additional features for staking, refunding, and managing rewards. It interacts with a USDe token and a USDe StakedUSDeV2 contract to provide a unique tokenomics model with a time-based countdown mechanism. The contract creator (owner) receives the yield generated from USDe deposits and staking rewards, while users can reclaim their initial deposit after a specified period.

## Key Features

1. ERC20 Compatibility
2. Time-based Countdown Mechanism
3. Staking and Unstaking Functionality
4. Reward Distribution to Contract Owner
5. Refund Capability for Users
6. Supply Cap
7. Yield Accrual for Contract Creator

## How It Works

### Initialization

The contract is initialized with the following parameters:
- Token name and symbol
- Image URL for token representation
- Initial owner address (contract creator)
- USDe token address
- StakedUSDeV2 contract address
- Countdown duration in days
- Rate for token minting
- Maximum supply cap

### Staking (Deposit)

Users can stake USDe tokens using the `depositToStakedUSDeV2` function:
- This function is only available before the countdown ends.
- It mints RefundableTokens to the user based on the deposit amount and the set rate.
- The deposited USDe tokens are then staked in the StakedUSDeV2 contract.

### Yield and Rewards

- The USDe tokens deposited into the contract generate yield through the StakedUSDeV2 contract.
- This yield accumulates over time and is separate from the users' initial deposits.
- After the countdown period, the contract owner (creator) can claim these accumulated rewards.

### Unstaking Rewards

After the countdown ends, the contract owner can unstake rewards:
1. Call `unstakeAllRewars` to initiate the cooldown process for all staked shares.
2. Once the cooldown period is over, call `unstakeReward` to:
   - Unstake the tokens from StakedUSDeV2.
   - Transfer the reward portion (yield generated above the initial deposits) to the contract owner.

### Withdrawal for Users

Users can withdraw their initial stake after the countdown ends and rewards are unstaked:
- The `withdrawal` function burns the user's RefundableTokens and returns the equivalent USDe tokens.
- The withdrawal amount is calculated based on the initial staking rate, ensuring users receive their original deposit.

## Key Components

1. **Countdown Mechanism**: Implemented using `countdownEnd` timestamp and modifiers `countdownEnded` and `countdownNotEnded`.
2. **Staking Integration**: Interacts with `StakedUSDeV2` contract for staking and unstaking operations.
3. **Rate System**: Uses a `rate` variable to determine the minting ratio of RefundableTokens to USDe.
4. **Supply Cap**: Enforces a maximum supply limit through the `maxSupply` variable.
5. **Reward Management**: Separates and distributes staking rewards to the contract owner.

## Security Features

- Uses OpenZeppelin's `SafeERC20` for secure token transfers.
- Implements `Ownable` for access control on critical functions.
- Checks for sufficient balances and valid conditions before executing transactions.

## Usage

1. Deploy the contract with appropriate parameters.
2. Users can stake USDe tokens before the countdown ends.
3. After the countdown, the owner unstakes and claims rewards.
4. Users can then withdraw their initial stake.

## Important Notes

- The contract assumes the existence of a USDe token and a StakedUSDeV2 contract.
- The refund mechanism is tied to a specific timeframe defined by the countdown.
- Proper management of the staking and unstaking process is crucial for the contract's intended functionality.