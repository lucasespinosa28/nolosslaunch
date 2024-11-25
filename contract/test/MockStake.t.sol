// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/MockStake.sol";
import "../src/MockUSDe.sol";
import "../src/MocksUSDe.sol";

contract MockStakeTest is Test {
    MockStake public mockStake;
    MockUSDe public mockUSDe;
    MocksUSDe public mocksUSDe;
    address public user1;
    address public user2;

    function setUp() public {
        mockUSDe = new MockUSDe();
        mocksUSDe = new MocksUSDe();
        mockStake = new MockStake(address(mockUSDe), address(mocksUSDe));

        user1 = address(0x1);
        user2 = address(0x2);

        // Mint some USDe to user1
        mockUSDe.mint(user1, 1000e18);
        mockUSDe.mint(user2, 1000e18);
    }

    function testDeposit() public {
        vm.startPrank(user1);
        mockUSDe.approve(address(mockStake), 100e18);
        mockStake.deposit(100e18, user1);
        vm.stopPrank();

        assertEq(mocksUSDe.balanceOf(user1), 100e18, "User should receive correct amount of sUSDe");
        assertEq(mockUSDe.balanceOf(address(mockStake)), 100e18, "MockStake should receive correct amount of USDe");
    }

    function testCooldownAndUnstake() public {
        // Deposit
        vm.startPrank(user1);
        mockUSDe.approve(address(mockStake), 100e18);
        mockStake.deposit(100e18, user1);

        // Cooldown
        mockStake.cooldownShares(100e18);
        uint256 cooldownTimestamp = block.timestamp;

        // Try to unstake immediately (should fail)
        vm.expectRevert("Cooldown period not over");
        mockStake.unstake(user1);

        // Wait for cooldown to pass
        vm.warp(cooldownTimestamp + 1 hours + 1);

        // Approve sUSDe transfer for unstaking
        mocksUSDe.approve(address(mockStake), 100e18);

        // Unstake
        uint256 initialBalance = mockUSDe.balanceOf(user1);
        mockStake.unstake(user1);
        vm.stopPrank();

        uint256 finalBalance = mockUSDe.balanceOf(user1);
        assertEq(finalBalance - initialBalance, 101e18, "User should receive original stake plus 1% interest");
        assertEq(mocksUSDe.balanceOf(user1), 0, "User should have no sUSDe left");
    }

    function testUnstakeWithLongerHold() public {
        // Deposit
        vm.startPrank(user1);
        mockUSDe.approve(address(mockStake), 100e18);
        mockStake.deposit(100e18, user1);

        // Cooldown
        mockStake.cooldownShares(100e18);
        uint256 cooldownTimestamp = block.timestamp;

        // Wait for 3 hours
        vm.warp(cooldownTimestamp + 3 hours);

        // Approve sUSDe transfer for unstaking
        mocksUSDe.approve(address(mockStake), 100e18);

        // Unstake
        uint256 initialBalance = mockUSDe.balanceOf(user1);
        mockStake.unstake(user1);
        vm.stopPrank();

        uint256 finalBalance = mockUSDe.balanceOf(user1);
        assertEq(finalBalance - initialBalance, 103e18, "User should receive original stake plus 3% interest");
    }
}