# NoLossLaunch Frontend

## Overview

NoLossLaunch is a decentralized platform for launching new tokens. This frontend application provides an intuitive interface for users to create and manage token launches, as well as interact with existing tokens.

## Technologies Used

- Next.js 15.0.3
- React 19.0.0-rc
- TypeScript
- Tailwind CSS
- React Hook Form
- Wagmi (for Ethereum interactions)
- Tanstack React Query
- Uploadthing (for image uploads)

## Key Features

1. **Token Creation**: Users can create new tokens by filling out a form with token details.
2. **Image Upload**: Integrated image upload functionality for token logos.
3. **Wallet Connection**: Utilizes ConnectKit for seamless wallet connections.
4. **Transaction Handling**: Manages Ethereum transactions and provides feedback on their status.
5. **Responsive Design**: Mobile-friendly interface using Tailwind CSS.

## Project Structure

- `app/`: Contains the main pages and API routes.
  - `create/`: Token creation page.
  - `token/[id]/`: Individual token page.
  - `api/`: API routes, including uploadthing configuration.
- `components/`: Reusable React components.
  - `ui/`: UI components like buttons, cards, etc.
  - `contract/`: Components for interacting with smart contracts.
- `hooks/`: Custom React hooks, including contract interaction hooks.
- `utils/`: Utility functions.
- `types/`: TypeScript type definitions.

## Key Components

### Token Creation (`app/create/page.tsx`)

- Allows users to input token details and upload a token image.
- Utilizes React Hook Form for form handling.
- Integrates with the blockchain to create new tokens.

### Token Details (`app/token/[id]/page.tsx`)

- Displays detailed information about a specific token.
- Shows token supply, deposits, and allows for token interactions.

### Web3 Integration

- Uses Wagmi for Ethereum interactions.
- Custom hooks in `hooks/contract/` for reading from and writing to smart contracts.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install