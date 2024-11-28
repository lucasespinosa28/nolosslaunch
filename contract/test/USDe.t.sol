// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

import "forge-std/Test.sol";
import "../src/USDe.sol";

contract USDeTest is Test {
    USDe public usde;
    address public admin;
    address public minter;
    address public user;

    event MinterUpdated(address indexed newMinter, address indexed oldMinter);

    function setUp() public {
        admin = address(this);
        minter = address(0x1);
        user = address(0x2);
        usde = new USDe(admin);
    }

    function testInitialState() public view{
        assertEq(usde.name(), "USDe");
        assertEq(usde.symbol(), "USDe");
        assertEq(usde.decimals(), 18);
        assertEq(usde.owner(), admin);
        assertEq(usde.minter(), address(0));
    }

    function testSetMinter() public {
        vm.expectEmit(true, true, false, false);
        emit MinterUpdated(minter, address(0));
        usde.setMinter(minter);
        assertEq(usde.minter(), minter);
    }

    function testMint() public {
        usde.setMinter(minter);
        vm.prank(minter);
        usde.mint(user, 1000);
        assertEq(usde.balanceOf(user), 1000);
    }

    function testBurn() public {
        usde.setMinter(minter);
        vm.prank(minter);
        usde.mint(user, 1000);

        vm.prank(user);
        usde.burn(500);
        assertEq(usde.balanceOf(user), 500);
    }

    function testRenounceOwnership() public {
        vm.expectRevert(IUSDeDefinitions.CantRenounceOwnership.selector);
        usde.renounceOwnership();
    }

    function testTransferOwnership() public {
        usde.transferOwnership(user);
        assertEq(usde.owner(), admin);
        assertEq(usde.pendingOwner(), user);

        vm.prank(user);
        usde.acceptOwnership();
        assertEq(usde.owner(), user);
    }

}