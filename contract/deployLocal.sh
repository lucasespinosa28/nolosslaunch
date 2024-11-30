#!/bin/bash
source .env
forge script script/scriptDeploy.s.sol:DeployScript --rpc-url $LOCAL_HOST --broadcast