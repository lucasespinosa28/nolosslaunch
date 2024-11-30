#!/bin/bash
source .env
forge script script/scriptDeploy.s.sol:DeployScript --rpc-url $LOCAL_HOST --broadcast
cast send 0xb4CFFED5937Fe67D7d73D0f77837B9A8D87E445E "function mint(address, uint256)" 0xB31BAEEB2D3D6E5d68A5F9405533EB5E2575984d 100ether --rpc-url $LOCAL_HOST  --private-key $PRIVATE_KEY
cast call 0xb4CFFED5937Fe67D7d73D0f77837B9A8D87E445E "balanceOf(address)" 0xB31BAEEB2D3D6E5d68A5F9405533EB5E2575984d --rpc-url $LOCAL_HOST