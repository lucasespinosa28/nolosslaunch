#!/bin/bash
source .env
forge script script/scriptDeploySepolia.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verifier etherscan --verifier-api-key $ETHERSCAN_API_KEY