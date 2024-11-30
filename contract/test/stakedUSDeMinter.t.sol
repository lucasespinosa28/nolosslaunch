// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/StakedUSDeMinter.sol";
import "../src/StakedUSDeV2.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDe is ERC20 {
    constructor() ERC20("Mock USDe", "mUSDe") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract StakedUSDeMinterTest is Test {
    StakedUSDeMinter public minter;
    StakedUSDeV2 public stakedUsdeV2;
    MockUSDe public usdeToken;

    address public owner;
    address public user1;
    address public user2;

    uint256 public constant INITIAL_SUPPLY = 1000000 * 1e18;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        usdeToken = new MockUSDe();
        // stakedUsdeV2 = new StakedUSDeV2(address(usdeToken),owner,owner);
        stakedUsdeV2 = new StakedUSDeV2(
            IERC20(address(usdeToken)),
            owner,
            owner
        );
        minter = new StakedUSDeMinter(
            "Staked USDe",
            "stUSDe",
            "",
            owner,
            address(usdeToken),
            address(stakedUsdeV2),
            1,
            2,
            2 ether * 1e10
        );

        usdeToken.mint(user1, INITIAL_SUPPLY);
        usdeToken.mint(user2, INITIAL_SUPPLY);
    }

    function testDepositToStakedUSDeV2() public {
        uint256 depositAmount = 1000 * 1e18;

        vm.startPrank(user1);
        usdeToken.approve(address(minter), depositAmount);
        minter.depositToStakedUSDeV2(depositAmount);
        vm.stopPrank();

        assertEq(
            minter.balanceOf(user1),
            depositAmount * minter.rate(),
            "User should receive correct amount of stUSDe"
        );
        assertEq(
            stakedUsdeV2.balanceOf(address(minter)),
            depositAmount,
            "StakedUSDeV2 should have correct balance"
        );
    }

    function testUnstakeAllRewards() public {
        uint256 depositAmount = 1000 * 1e18;

        vm.startPrank(user1);
        usdeToken.approve(address(minter), depositAmount);
        minter.depositToStakedUSDeV2(depositAmount);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days + 1);
        minter.unstakeAllRewars();

        assertEq(
            stakedUsdeV2.balanceOf(address(minter)),
            0,
            "All shares should be in cooldown"
        );
    }

    function testUnstakeReward() public {
        vm.startPrank(owner);
        stakedUsdeV2.setCooldownDuration(1 hours);
        vm.stopPrank();

        uint256 depositAmount = 1000 * 1e18;

        vm.startPrank(user1);
        usdeToken.approve(address(minter), depositAmount);
        minter.depositToStakedUSDeV2(depositAmount);
        vm.stopPrank();

        // Simulate some rewards
        usdeToken.mint(address(stakedUsdeV2), 100 * 1e18);

        vm.warp(block.timestamp + 1 days + 1);
        minter.unstakeAllRewars();
        vm.warp(block.timestamp + 1 hours + 1);
        minter.unstakeReward();

        assertGt(
            usdeToken.balanceOf(address(owner)),
            99 ether,
            "Owner should receive rewards"
        );
        assertEq(
            depositAmount,
            usdeToken.balanceOf(address(minter)),
            "StakedUSDeV2 balance should remain the same"
        );
    }

    function testWithdrawal() public {
        uint256 depositAmount = 1000 * 1e18;

        vm.startPrank(owner);
        stakedUsdeV2.setCooldownDuration(1 hours);
        vm.stopPrank();

        vm.startPrank(user1);
        usdeToken.approve(address(minter), depositAmount);
        minter.depositToStakedUSDeV2(depositAmount);
        assertEq(
            minter.balanceOf(user1),
            depositAmount * minter.rate(),
            "User should receive correct amount of stUSDe"
        );
        vm.stopPrank();

        vm.startPrank(user2);
        usdeToken.approve(address(minter), depositAmount);
        minter.depositToStakedUSDeV2(depositAmount);
        assertEq(
            minter.balanceOf(user2),
            depositAmount * minter.rate(),
            "User should receive correct amount of stUSDe"
        );
        vm.stopPrank();

        assertEq(
            usdeToken.balanceOf(address(stakedUsdeV2)),
            depositAmount * 2,
            "stake balance"
        );

        // Simulate some rewards
        usdeToken.mint(address(stakedUsdeV2), 100 * 1e18);
        assertEq(
            usdeToken.balanceOf(address(stakedUsdeV2)),
            2100 ether,
            "stake rewards balance"
        );

        vm.warp(block.timestamp + 1 days + 1);
        minter.unstakeAllRewars();
        vm.warp(block.timestamp + 1 hours + 1);
        minter.unstakeReward();
        assertEq(
            usdeToken.balanceOf(address(minter)),
            2000 ether,
            "minter balance  balance"
        );
        vm.startPrank(user1);
        assertEq(
            usdeToken.balanceOf(address(minter)),
            2000 ether,
            "before after  withdrawal balance"
        );
        uint256 balance = usdeToken.balanceOf(address(user1));
        minter.withdrawal(depositAmount * minter.rate());
        assertEq(
            minter.balanceOf(user1),
            0,
            "User should have 0 amount of stUSDe"
        );
        assertEq(
            usdeToken.balanceOf(address(user1)),
            balance + 1000 ether,
            "stake after  withdrawal balance"
        );
        vm.stopPrank();
    }
}
