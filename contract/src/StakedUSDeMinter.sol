// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StakedUSDeV2.sol";

contract StakedUSDeMinter is ERC20, Ownable {
    using SafeERC20 for IERC20;
    uint256 public immutable countdownEnd;
    IERC20 public immutable usdeToken;
    StakedUSDeV2 public immutable stakedUsdeV2;
    uint16 public rate;
    bool public rewardsUnstaked;
    string public imageUrl;
    uint256 public maxSupply;

    constructor(
        string memory name,
        string memory symbol,
        string memory _imageUrl,
        address initialOwner,
        address _usdeTokenAddress,
        address _stakedUsdeV2,
        uint256 _countdownDays,
        uint16 _rate,
        uint256 _maxSupply
    ) ERC20(name, symbol) Ownable(initialOwner) {
        usdeToken = IERC20(_usdeTokenAddress);
        stakedUsdeV2 = StakedUSDeV2(_stakedUsdeV2);
        countdownEnd = block.timestamp + (_countdownDays * 1 days);
        rate = _rate;
        imageUrl = _imageUrl;
        maxSupply = _maxSupply;
    }

    modifier countdownEnded() {
        require(block.timestamp >= countdownEnd, "Countdown has not ended yet");
        _;
    }

    modifier countdownNotEnded() {
        require(block.timestamp < countdownEnd, "Countdown has ended");
        _;
    }

    function depositToStakedUSDeV2(uint256 amount) external  countdownNotEnded{
        require(
            totalSupply() + (amount * rate) <= maxSupply,
            "Max supply reached"
        );
        // Transfer USDe from the caller to this contract
        usdeToken.safeTransferFrom(msg.sender, address(this), amount);

        // Approve StakedUSDeV2 to spend the USDe
        usdeToken.approve(address(stakedUsdeV2), amount);

        // Deposit USDe into StakedUSDeV2
        stakedUsdeV2.deposit(amount, address(this));

        // Mint a token in exchange for USDe the user deposit
        _mint(msg.sender, amount * rate);
    }

    function unstakeAllRewars() public countdownEnded {
        uint256 shares = stakedUsdeV2.balanceOf(address(this));
        stakedUsdeV2.cooldownShares(shares);
    }

    function unstakeReward() public  countdownEnded{
        stakedUsdeV2.unstake(address(this));
        uint256 initialBalance = usdeToken.balanceOf(address(this));
        // uint256 rewars = initialBalance - totalSupply();
        usdeToken.transfer(owner(), initialBalance - (totalSupply() / rate));
        rewardsUnstaked = true;
    }

    function withdrawal(uint256 amount) external countdownEnded{
        require(rewardsUnstaked, "Rewards must be unstaked before withdrawal");
        require(balanceOf(msg.sender) >= amount, "Insufficient stUSDe balance");
        // Burn the stUSDe tokens
        _burn(msg.sender, amount);
        // Transfer USDe from the caller to this contract
        usdeToken.safeTransfer(msg.sender, amount / rate);
    }
}
