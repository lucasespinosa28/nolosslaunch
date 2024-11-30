// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/StakedUSDeMinterFactory.sol";
import "../src/StakedUSDeMinter.sol";
import "../src/StakedUSDeV2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockUSDe is IERC20 {
    function transfer(address, uint256) external pure returns (bool) {
        return true;
    }

    function transferFrom(
        address,
        address,
        uint256
    ) external pure returns (bool) {
        return true;
    }

    function approve(address, uint256) external pure returns (bool) {
        return true;
    }

    function balanceOf(address) external pure returns (uint256) {
        return 1000 ether;
    }

    function allowance(address, address) external pure returns (uint256) {
        return 1000 ether;
    }

    function totalSupply() external pure returns (uint256) {
        return 1000000 ether;
    }
}

contract StakedUSDeMinterFactoryTest is Test {
    StakedUSDeMinterFactory public factory;
    MockUSDe public usdeToken;
    StakedUSDeV2 public stakedUsdeV2;

    address public owner = address(1);
    string public constant TOKEN_NAME = "Test Token";
    string public constant TOKEN_SYMBOL = "TT";
    string public constant IMAGE_URL = "https://example.com/image.png";
    uint256 public constant COUNTDOWN_DAYS = 30;
    uint16 public constant RATE = 100; // 1%
    bytes32 public constant SALT = bytes32(uint256(1));

    function setUp() public {
        usdeToken = new MockUSDe();
        stakedUsdeV2 = new StakedUSDeV2(
            IERC20(address(usdeToken)),
            owner,
            owner
        );
        factory = new StakedUSDeMinterFactory(address(usdeToken), address(stakedUsdeV2));
    }

    function testCreateLaunchpad() public {
        vm.prank(owner);
        address launchpadAddress = factory.createToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            IMAGE_URL,
            COUNTDOWN_DAYS,
            RATE,
            2 ether * 1e10,
            SALT
        );

        assertTrue(
            launchpadAddress != address(0),
            "Launchpad address should not be zero"
        );

        StakedUSDeMinter launchpad = StakedUSDeMinter(launchpadAddress);
        assertEq(launchpad.name(), TOKEN_NAME, "Token name mismatch");
        assertEq(launchpad.symbol(), TOKEN_SYMBOL, "Token symbol mismatch");
        assertEq(launchpad.imageUrl(), IMAGE_URL, "Image URL mismatch");
        assertEq(launchpad.owner(), owner, "Owner mismatch");
        assertEq(
            address(launchpad.usdeToken()),
            address(usdeToken),
            "USDe token mismatch"
        );
        assertEq(
            address(launchpad.stakedUsdeV2()),
            address(stakedUsdeV2),
            "StakedUSDeV2 mismatch"
        );
        assertEq(
            launchpad.countdownEnd(),
            block.timestamp + (COUNTDOWN_DAYS * 1 days),
            "Countdown end mismatch"
        );
        assertEq(launchpad.rate(), RATE, "Rate mismatch");
    }


    function testLaunchpadCreatedEvent() public {
        bytes memory bytecode = type(StakedUSDeMinter).creationCode;
        bytes memory constructorArgs = abi.encode(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            IMAGE_URL,
            owner,
            address(usdeToken),
            address(stakedUsdeV2),
            COUNTDOWN_DAYS,
            RATE,
            2 ether * 1e10
        );
        bytes32 salt = SALT;
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(factory),
                salt,
                keccak256(abi.encodePacked(bytecode, constructorArgs))
            )
        );
        address expectedAddress = address(uint160(uint256(hash)));

        uint256 expectedRefundDate = block.timestamp +
            (COUNTDOWN_DAYS * 1 days);

        vm.expectEmit(true, false, false, true);
        emit StakedUSDeMinterFactory.TokenCreated(
            expectedAddress,
            owner
        );

        vm.prank(owner);
        address actualAddress = factory.createToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            IMAGE_URL,
            COUNTDOWN_DAYS,
            RATE,
            2 ether * 1e10,
            SALT
        );

        assertEq(
            actualAddress,
            expectedAddress,
            "Created launchpad address doesn't match expected"
        );
    }

    function testCreateLaunchpadWithDifferentSalts() public {
        vm.startPrank(owner);

        address launchpad1 = factory.createToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            IMAGE_URL,
            COUNTDOWN_DAYS,
            RATE,
            2 ether * 1e10,
            SALT
        );
        address launchpad2 = factory.createToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            IMAGE_URL,
            COUNTDOWN_DAYS,
            RATE,
            2 ether * 1e10,
            bytes32(uint256(2))
        );

        assertTrue(
            launchpad1 != launchpad2,
            "Launchpads should have different addresses"
        );

        vm.stopPrank();
    }
}
