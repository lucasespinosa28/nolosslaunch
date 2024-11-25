// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/Launchpad.sol";
import "../src/MockStake.sol";
import "../src/MockUSDe.sol";
import "../src/MocksUSDe.sol";

contract LaunchpadTest is Test {
    Launchpad public launchpad;
    MockUSDe public usde;
    MocksUSDe public sUsde;
    MockStake public stake;

    address public owner;
    address public user1;
    address public user2;

    uint256 public constant INITIAL_BALANCE = 1000 ether;
    uint256 public constant MAX_SUPPLY = 1000 ether;
    uint256 public constant RATE = 2;
    uint256 public constant COUNTDOWN_DAYS = 7;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        usde = new MockUSDe();
        sUsde = new MocksUSDe();
        stake = new MockStake(address(usde), address(sUsde));

        launchpad = new Launchpad(
            "Launchpad Token",
            "LPT",
            address(usde),
            address(sUsde),
            address(stake),
            COUNTDOWN_DAYS,
            MAX_SUPPLY,
            RATE,
            owner
        );

        usde.mint(user1, INITIAL_BALANCE);
        usde.mint(user2, INITIAL_BALANCE);
    }

    function testDeposit() public {
        vm.startPrank(user1);
        usde.approve(address(launchpad), 100 ether); // Add this line to approve the Launchpad contract
        launchpad.deposit(100 ether);
        vm.stopPrank();

        assertEq(launchpad.balanceOf(user1), 200 ether);
        assertEq(usde.balanceOf(address(stake)), 100 ether);
    }

    function testDepositExceedsMaxSupply() public {
        vm.startPrank(user1);
        usde.approve(address(launchpad), 1000 ether);
        launchpad.deposit(500 ether);

        vm.expectRevert("Max supply reached");
        launchpad.deposit(1 ether);
        vm.stopPrank();
    }

    function testDepositAfterCountdown() public {
        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);

        vm.startPrank(user1);
        usde.approve(address(launchpad), 100 ether);

        vm.expectRevert("Countdown has ended");
        launchpad.deposit(100 ether);
        vm.stopPrank();
    }

    function testUnstake() public {
        vm.startPrank(user1);
        usde.approve(address(launchpad), 100 ether);
        launchpad.deposit(100 ether);
        vm.stopPrank();

        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);
        launchpad.cooldownAllShares();
        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);
        launchpad.unstake();

        assertEq(usde.balanceOf(owner), 168 ether);
        assertEq(usde.balanceOf(address(launchpad)), 100 ether);
    }

    function testWithdraw() public {
        vm.startPrank(user1);
        usde.approve(address(launchpad), 100 ether);
        launchpad.deposit(100 ether);
        vm.stopPrank();

        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);
        launchpad.cooldownAllShares();
        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);
        launchpad.unstake();

        vm.startPrank(user1);
        launchpad.withdraw(200 ether);
        vm.stopPrank();

        assertEq(launchpad.balanceOf(user1), 0);
        assertEq(usde.balanceOf(user1), INITIAL_BALANCE);
    }

    function testWithdrawBeforeUnstake() public {
        vm.startPrank(user1);
        usde.approve(address(launchpad), 100 ether);
        launchpad.deposit(100 ether);
        vm.stopPrank();

        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);

        vm.startPrank(user1);
        vm.expectRevert("Unstaking has not occurred yet");
        launchpad.withdraw(200 ether);
        vm.stopPrank();
    }
    function testMassDepositAndWithdraw() public {
        uint256 numUsers = 500;
        uint256 depositAmount = 1 ether;
        uint256 totalDeposit = numUsers * depositAmount;

        // Create and fund users
        address[] memory users = new address[](numUsers);
        for (uint256 i = 0; i < numUsers; i++) {
            users[i] = address(uint160(i + 1000)); // Unique address for each user
            usde.mint(users[i], depositAmount);
        }

        assertEq(launchpad.totalSupply(), 0);
        // Deposits
        for (uint256 i = 0; i < numUsers; i++) {
            vm.startPrank(users[i]);
            usde.approve(address(launchpad), depositAmount);
            launchpad.deposit(depositAmount);
            vm.stopPrank();
        }

        assertEq(launchpad.totalSupply(), totalDeposit * RATE);
        assertEq(sUsde.balanceOf(address(launchpad)), totalDeposit);

        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);
        launchpad.cooldownAllShares();
        vm.warp(block.timestamp + (COUNTDOWN_DAYS * 1 days) + 1);
        launchpad.unstake();

        // Withdrawals
        for (uint256 i = 0; i < numUsers; i++) {
            uint256 expectedBalance = depositAmount * RATE;
            vm.startPrank(users[i]);
            launchpad.withdraw(expectedBalance);
            vm.stopPrank();

            // Verify individual balances after withdrawal
            assertEq(launchpad.balanceOf(users[i]), 0);
            assertEq(usde.balanceOf(users[i]), depositAmount);
        }

        uint256 onwerBalanceAfter = usde.balanceOf(owner);
        assertEq(onwerBalanceAfter,840 ether);
    }
}
