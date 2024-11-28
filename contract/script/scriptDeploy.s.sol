// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {USDe} from "../src/USDe.sol";
import {StakedUSDeV2} from "../src/StakedUSDeV2.sol";
import {StakedUSDeMinterFactory} from "../src/StakedUSDeMinterFactory.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        address admin = address(this);
        USDe usde = new USDe(admin);
        console.log("%s usde address", address(usde));
        StakedUSDeV2 stakedUSDeV2 = new StakedUSDeV2(
            usde,
            msg.sender,
            msg.sender
        );
        console.log("%s StakedUSDeV2 address", address(stakedUSDeV2));
        StakedUSDeMinterFactory factory = new StakedUSDeMinterFactory(
            address(usde),
            stakedUSDeV2
        );
        console.log("%s factory address", address(factory));
        vm.stopBroadcast();
    }
}
