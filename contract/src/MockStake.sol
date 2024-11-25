// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {MockUSDe} from "./MockUSDe.sol";
import {MocksUSDe} from "./MocksUSDe.sol";

contract MockStake {
    ERC20 public stakingToken;
    uint256 public constant cooldownDuration = 1 hours;
    MockUSDe private immutable Usde;
    MocksUSDe private immutable sUSDe;

    mapping(address => uint256) public cooldownTimestamps;

    constructor(address _Usde, address _sUSDe) {
        Usde = MockUSDe(_Usde);
        sUSDe = MocksUSDe(_sUSDe);
    }

    function deposit(uint256 amount, address receiver) external {
        require(
            Usde.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        sUSDe.mint(receiver, amount);
    }

    function cooldownShares(uint256 amount) external {
        require(sUSDe.balanceOf(msg.sender) >= amount, "Insufficient balance");
        cooldownTimestamps[msg.sender] = block.timestamp;
        // In a real implementation, you might want to transfer shares to a cooldown state
    }

    function cooldownAssets(uint256 amount) external {
        require(Usde.balanceOf(msg.sender) >= amount, "Insufficient balance");
        cooldownTimestamps[msg.sender] = block.timestamp;
        // In a real implementation, you might want to transfer shares to a cooldown state
    }

    function unstake(address to) external {
        require(
            block.timestamp >=
                cooldownTimestamps[msg.sender] + cooldownDuration,
            "Cooldown period not over"
        );
        uint256 amount = sUSDe.balanceOf(msg.sender);
        require(amount > 0, "No balance to unstake");

        sUSDe.transferFrom(msg.sender, address(this), amount);

        // Calculate extra USDe to mint
        uint256 hoursHeld = (block.timestamp - cooldownTimestamps[msg.sender]) / 1 hours;
        uint256 extraAmount = amount * hoursHeld / 100; // 1% extra per hour

        // Mint extra USDe
        Usde.mint(to, extraAmount);

        // Transfer original amount plus extra
        require(Usde.transfer(to, amount), "Transfer failed");

        // Reset cooldown timestamp
        cooldownTimestamps[msg.sender] = 0;
    }
}
