# NoLossToken

NoLossToken is a decentralized platform for launching new tokens with a unique "no loss" feature. This project combines smart contracts for token minting and refunding with a React-based frontend for user interaction.

## Project Overview

NoLossToken is token launch mechanism that benefits both creators and users. Here's how it works:

1. **Token Creation**: Creators can launch new tokens through the platform.

2. **Token Purchase**: Users buy these newly created tokens using USDe (a stablecoin).

3. **USDe Deposit**: The USDe used for purchases is deposited into a smart contract.

4. **Yield Generation**: The deposited USDe generates yield while it's locked in the contract.

5. **Creator Rewards**: After a specified period, creators can claim their rewards, which come from the generated yield.

6. **User Refunds**: Users have the option to refund their purchased tokens, receiving their original USDe back.

This mechanism creates a "no loss" situation for users, as they can always reclaim their initial investment, while creators benefit from the yield generated during the lock-up period.

## Overview

RefundableToken is an ERC20-compliant token contract with additional features for staking, refunding, and managing rewards. It interacts with a USDe token and a USDe StakedUSDeV2 contract to provide a unique tokenomics model with a time-based countdown mechanism. The contract creator (owner) receives the yield generated from USDe deposits and staking rewards, while users can reclaim their initial deposit after a specified period.

Key Features:
1. Create and launch new tokens
2. Purchase tokens with USDe
3. Automatic yield generation on deposited USDe
4. Timed reward release for creators
5. Refund option for token buyers

The project consists of two main parts:
1. Smart Contracts (Backend): Handles token creation, purchases, deposits, yield generation, and refunds.
2. React Frontend: Provides an intuitive interface for users to interact with the smart contracts.


## Smart Contracts

The core functionality is implemented in Solidity smart contracts. Key features include:

- Token creation and management
- USDe deposit and yield generation mechanism
- Timed reward distribution for creators
- Refund functionality for users
- Access control for administrative functions
## Smart Contracts

The core functionality is implemented in Solidity smart contracts. Key features include:

- Token creation and management
- Minting mechanism
- Refund functionality
- Access control for administrative functions

## Frontend

The frontend is built with React and Next.js, providing an intuitive interface for users to interact with the smart contracts. Key components include:

- Token creation form
- Token details page
- Minting interface
- Refund request handling
- Wallet connection using ConnectKit

## Key Technologies

- Solidity (Smart Contracts)
- React / Next.js (Frontend)
- ethers.js / wagmi (Ethereum interactions)
- Tailwind CSS (Styling)
- OpenZeppelin (Smart Contract Libraries)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- A web3 wallet (e.g., MetaMask)

### Installation

1. Clone the repository: