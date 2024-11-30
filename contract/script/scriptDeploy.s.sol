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
        address admin = 0x583D98c6FA793B9eFF80674F9Dca1BBc7cc6F9F2;
        USDe usde = new USDe(admin);
        console.log("%s usde address", address(usde));
        StakedUSDeV2 stakedUSDeV2 = new StakedUSDeV2(
            usde,
            admin,
            admin
        );
        stakedUSDeV2.setCooldownDuration(1 minutes);
        vm.stopPrank();
        console.log("%s StakedUSDeV2 address", address(stakedUSDeV2));
        RefundableTokenFactory factory = new RefundableTokenFactory(
            address(usde),
            address(stakedUSDeV2)
        );
        console.log("%s factory address", address(factory));
        vm.stopBroadcast();
    }
}
