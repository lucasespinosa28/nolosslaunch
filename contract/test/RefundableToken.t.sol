// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/RefundableToken.sol";
import "../src/StakedUSDeV2.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDe is ERC20 {
    constructor() ERC20("Mock USDe", "mUSDe") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract RefundableTokenTest is Test {
    RefundableToken public refundableToken;
    MockUSDe public usdeToken;
    StakedUSDeV2 public stakedUsdeV2;
    address public owner;
    address public bob;
    address public alice;
    uint256 depositAmount = 100 ether;

    function setUp() public {
        owner = address(this);
        bob = address(0x1);
        alice = address(0x2);
        usdeToken = new MockUSDe();
        stakedUsdeV2 = new StakedUSDeV2(
            IERC20(address(usdeToken)),
            owner,
            owner
        );

        refundableToken = new RefundableToken(
            "Refundable Token",
            "RFT",
            "http://example.com/image.png",
            owner,
            address(usdeToken),
            address(stakedUsdeV2),
            30, // 30 days countdown
            100, // rate
            1000000 * 10 ** 18 // max supply
        );
    }

    function testUnstakeCreatorAllRewars() public {
        // Fast forward to after countdown
        setCooldownDuration();
        deposit(bob);

        usdeToken.mint(address(stakedUsdeV2), depositAmount);

        vm.warp(block.timestamp + 31 days);
        uint256 initialShares = stakedUsdeV2.balanceOf(
            address(refundableToken)
        );

        refundableToken.unstakeCreatorAllRewars();

        uint256 finalShares = stakedUsdeV2.balanceOf(address(refundableToken));
        assertLt(finalShares, initialShares, "Shares should have decreased");
    }

    function testUnstakeCreatorReward() public {
        setCooldownDuration();
        deposit(bob);
        usdeToken.mint(address(stakedUsdeV2), depositAmount);
        // Fast forward to after countdown
        vm.warp(block.timestamp + 31 days);

        refundableToken.unstakeCreatorAllRewars();

        // Fast forward past cooldown period
        vm.warp(block.timestamp + 1 hours);

        uint256 initialBalance = usdeToken.balanceOf(owner);

        refundableToken.unstakeCreatorReward();

        uint256 finalBalance = usdeToken.balanceOf(owner);
        assertGt(
            finalBalance,
            initialBalance,
            "Owner should have received rewards"
        );
    }

    function testUnstakeToken() public {
        setCooldownDuration();
        deposit(bob);

        // Fast forward to after countdown
        vm.warp(block.timestamp + 31 days);

        uint256 initialBalance = refundableToken.balanceOf(bob);
        uint256 unstakeAmount = 50 ether * 100; // 50 ether worth of tokens (considering the rate)

        vm.startPrank(bob);
        refundableToken.unstakeToken(unstakeAmount);
        vm.stopPrank();

        uint256 finalBalance = refundableToken.balanceOf(bob);
        assertEq(
            finalBalance,
            initialBalance - unstakeAmount,
            "User balance should have decreased"
        );

        // Try to unstake again immediately (should fail)
        vm.expectRevert("Must wait 1 hour after unstaking");
        vm.prank(bob);
        refundableToken.unstakeToken(unstakeAmount);
    }

    function testWithdrawalTokenReward() public {
        setCooldownDuration();
        deposit(bob);

        // Fast forward to after countdown
        vm.warp(block.timestamp + 31 days);

        uint256 unstakeAmount = 50 ether * 100; // 50 ether worth of tokens

        vm.startPrank(bob);
        refundableToken.unstakeToken(unstakeAmount);

        // Fast forward 1 hour
        vm.warp(block.timestamp + 1 hours);

        uint256 initialBalance = usdeToken.balanceOf(bob);
        refundableToken.withdrawalTokenReward();
        uint256 finalBalance = usdeToken.balanceOf(bob);

        assertGt(
            finalBalance,
            initialBalance,
            "User should have received rewards"
        );
        vm.stopPrank();
    }

    function testUnstakeTokenAndWithdrawMultipleUsers() public {
        setCooldownDuration();
        deposit(bob);
        deposit(alice);

        // Fast forward to after countdown
        vm.warp(block.timestamp + 31 days);

        uint256 unstakeAmount = 50 ether * 100; // 50 ether worth of tokens

        // User 1 unstakes
        vm.prank(bob);
        refundableToken.unstakeToken(unstakeAmount);
        vm.stopPrank();
        // // User 2 tries to unstake (should succeed)
        vm.warp(block.timestamp + 1 hours);
        vm.prank(alice);
        refundableToken.unstakeToken(unstakeAmount);
        vm.stopPrank();
        uint256 finalBalanceBob = usdeToken.balanceOf(address(0x1));
        assertGt(finalBalanceBob, 0, "User should have received rewards");
        // Fast forward 1 hour
        vm.warp(block.timestamp + 1 hours);
        refundableToken.withdrawalTokenReward();
        uint256 finalBalanceAlice = usdeToken.balanceOf(alice);
        assertGt(finalBalanceAlice, 0, "User should have received rewards");
    }

    function setCooldownDuration() public {
        vm.startPrank(owner);
        stakedUsdeV2.setCooldownDuration(1 hours);
        vm.stopPrank();
    }

    function deposit(address user_) public {
        vm.startPrank(user_);
        usdeToken.mint(user_, depositAmount);
        usdeToken.approve(address(refundableToken), depositAmount);
        refundableToken.depositToStakedUSDeV2(depositAmount);
        vm.stopPrank();
    }
}
