#!/bin/bash
source .env
forge script script/scriptDeploy.s.sol:DeployScript --rpc-url $LOCAL_HOST --broadcast
cast send 0xb4CFFED5937Fe67D7d73D0f77837B9A8D87E445E "function mint(address, uint256)" 0x583D98c6FA793B9eFF80674F9Dca1BBc7cc6F9F2 100ether --rpc-url $LOCAL_HOST  --private-key $PRIVATE_KEY
cast call 0xb4CFFED5937Fe67D7d73D0f77837B9A8D87E445E "balanceOf(address)" 0x583D98c6FA793B9eFF80674F9Dca1BBc7cc6F9F2 --rpc-url $LOCAL_HOST