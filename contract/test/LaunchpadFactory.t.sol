// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/LaunchpadFactory.sol";
import "../src/Launchpad.sol";
import "../src/MockStake.sol";
import "../src/MockUSDe.sol";
import "../src/MocksUSDe.sol";

contract LaunchpadFactoryTest is Test {
    LaunchpadFactory factory;
    MockUSDe usde;
    MocksUSDe sUsde;
    MockStake stake;

    function setUp() public {
        factory = new LaunchpadFactory();
        usde = new MockUSDe();
        sUsde = new MocksUSDe();
        stake = new MockStake(address(usde),address(sUsde));
    }

    function testCreateLaunchpad() public {
        bytes32 salt = keccak256("test salt");
        address predictedAddress = factory.predictLaunchpadAddress(
            "Test Launchpad",
            "TLP",
            address(usde),
            address(sUsde),
            address(stake),
            30,
            1000000 * 10**18,
            100,
            address(this),
            salt
        );

        address createdAddress = factory.createLaunchpad(
            "Test Launchpad",
            "TLP",
            address(usde),
            address(sUsde),
            address(stake),
            30,
            1000000 * 10**18,
            100,
            address(this),
            salt
        );

        assertEq(predictedAddress, createdAddress, "Created address should match predicted address");

        Launchpad launchpad = Launchpad(createdAddress);
        assertEq(launchpad.name(), "Test Launchpad", "Launchpad name should match");
        assertEq(launchpad.symbol(), "TLP", "Launchpad symbol should match");
        assertEq(launchpad.maxSupply(), 1000000 * 10**18, "Launchpad max supply should match");
        assertEq(launchpad.rate(), 100, "Launchpad rate should match");
    }

    function testPredictLaunchpadAddress() public view {
        bytes32 salt = keccak256("another test salt");
        address predictedAddress = factory.predictLaunchpadAddress(
            "Another Test Launchpad",
            "ATL",
            address(usde),
            address(sUsde),
            address(stake),
            60,
            500000 * 10**18,
            50,
            address(this),
            salt
        );

        assertTrue(predictedAddress != address(0), "Predicted address should not be zero");
    }

    function testCreateMultipleLaunchpads() public {
        bytes32 salt1 = keccak256("salt 1");
        bytes32 salt2 = keccak256("salt 2");

        address launchpad1 = factory.createLaunchpad(
            "Launchpad 1",
            "LP1",
            address(usde),
            address(sUsde),
            address(stake),
            30,
            1000000 * 10**18,
            100,
            address(this),
            salt1
        );

        address launchpad2 = factory.createLaunchpad(
            "Launchpad 2",
            "LP2",
            address(usde),
            address(sUsde),
            address(stake),
            60,
            500000 * 10**18,
            50,
            address(this),
            salt2
        );

        assertTrue(launchpad1 != launchpad2, "Launchpads should have different addresses");
    }
}