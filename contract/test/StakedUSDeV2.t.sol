// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/StakedUSDeV2.sol";
import "../src/USDe.sol";

contract StakedUSDeV2Test is Test {
    StakedUSDeV2 public stakedUSDe;
    USDe public usde;
    address public owner;
    address public user1;
    address public user2;

    uint256 public constant INITIAL_SUPPLY = 1_000_000e18;
    uint256 public constant STAKE_AMOUNT = 100_000e18;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        usde = new USDe(owner);
        stakedUSDe = new StakedUSDeV2(IERC20(address(usde)), owner, owner);

        usde.mint(user1, INITIAL_SUPPLY);
        usde.mint(user2, INITIAL_SUPPLY);

        vm.startPrank(user1);
        usde.approve(address(stakedUSDe), type(uint256).max);
        vm.stopPrank();

        vm.startPrank(user2);
        usde.approve(address(stakedUSDe), type(uint256).max);
        vm.stopPrank();
    }

    function testWithdraw() public {
        vm.startPrank(owner);
        stakedUSDe.setCooldownDuration(0); // Disable cooldown
        vm.stopPrank();

        vm.startPrank(user1);
        stakedUSDe.deposit(STAKE_AMOUNT, user1);
        uint256 initialBalance = usde.balanceOf(user1);
        uint256 sharesBalance = stakedUSDe.balanceOf(user1);

        stakedUSDe.withdraw(STAKE_AMOUNT, user1, user1);

        assertEq(usde.balanceOf(user1), initialBalance + STAKE_AMOUNT, "Withdrawal amount incorrect");
        assertEq(stakedUSDe.balanceOf(user1), sharesBalance - STAKE_AMOUNT, "Shares not burned correctly");
        vm.stopPrank();
    }

    function testUnstake() public {
        vm.startPrank(owner);
        stakedUSDe.setCooldownDuration(1 days);
        vm.stopPrank();

        vm.startPrank(user1);
        stakedUSDe.deposit(STAKE_AMOUNT, user1);
        stakedUSDe.cooldownAssets(STAKE_AMOUNT);

        vm.warp(block.timestamp + 1 days + 1); // Fast forward past cooldown period

        uint256 initialBalance = usde.balanceOf(user1);
        stakedUSDe.unstake(user1);

        assertEq(usde.balanceOf(user1), initialBalance + STAKE_AMOUNT, "Unstake amount incorrect");
        vm.stopPrank();
    }

    function testCooldownAssets() public {
        vm.startPrank(owner);
        stakedUSDe.setCooldownDuration(1 days);
        vm.stopPrank();

        vm.startPrank(user1);
        stakedUSDe.deposit(STAKE_AMOUNT, user1);
        uint256 initialShares = stakedUSDe.balanceOf(user1);

        uint256 assets = STAKE_AMOUNT / 2;
        uint256 shares = stakedUSDe.cooldownAssets(assets);

        assertEq(stakedUSDe.balanceOf(user1), initialShares - shares, "Shares not deducted correctly");

        (uint104 cooldownEnd, uint152 underlyingAmount) = stakedUSDe.cooldowns(user1);
        assertEq(underlyingAmount, assets, "Underlying amount in cooldown incorrect");
        assertEq(cooldownEnd, block.timestamp + 1 days, "Cooldown end time incorrect");
        vm.stopPrank();
    }

    function testCooldownShares() public {
        vm.startPrank(owner);
        stakedUSDe.setCooldownDuration(1 days);
        vm.stopPrank();

        vm.startPrank(user1);
        stakedUSDe.deposit(STAKE_AMOUNT, user1);
        uint256 initialShares = stakedUSDe.balanceOf(user1);

        uint256 sharesToCooldown = initialShares / 2;
        uint256 assets = stakedUSDe.cooldownShares(sharesToCooldown);

        assertEq(stakedUSDe.balanceOf(user1), initialShares - sharesToCooldown, "Shares not deducted correctly");

        (uint104 cooldownEnd, uint152 underlyingAmount) = stakedUSDe.cooldowns(user1);
        assertEq(underlyingAmount, assets, "Underlying amount in cooldown incorrect");
        assertEq(cooldownEnd, block.timestamp + 1 days, "Cooldown end time incorrect");
        vm.stopPrank();
    }

    function testFailWithdrawWithCooldownOn() public {
        vm.startPrank(owner);
        stakedUSDe.setCooldownDuration(1 days);
        vm.stopPrank();

        vm.startPrank(user1);
        stakedUSDe.deposit(STAKE_AMOUNT, user1);
        stakedUSDe.withdraw(STAKE_AMOUNT, user1, user1); // This should revert
        vm.stopPrank();
    }

    function testFailUnstakeBeforeCooldownEnd() public {
        vm.startPrank(owner);
        stakedUSDe.setCooldownDuration(1 days);
        vm.stopPrank();

        vm.startPrank(user1);
        stakedUSDe.deposit(STAKE_AMOUNT, user1);
        stakedUSDe.cooldownAssets(STAKE_AMOUNT);

        vm.warp(block.timestamp + 12 hours); // Only half of cooldown period

        stakedUSDe.unstake(user1); // This should revert
        vm.stopPrank();
    }
}