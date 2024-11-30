// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {USDe} from "../src/USDe.sol";
import {StakedUSDeV2} from "../src/StakedUSDeV2.sol";
import {RefundableTokenFactory} from "../src/RefundableTokenFactory.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        RefundableTokenFactory factory = new RefundableTokenFactory(
            0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696,
            0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b
        );
        console.log("%s factory address", address(factory));
        vm.stopBroadcast();
    }
}
