// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StakedUSDeV2.sol";

contract RefundableTokenLocal is ERC20, Ownable {
    using SafeERC20 for IERC20;
    uint256 public immutable countdownEnd;
    IERC20 public immutable usdeToken;
    StakedUSDeV2 public immutable stakedUsdeV2;
    uint16 public rate;
    bool public rewardsUnstaked;
    string public imageUrl;
    uint256 public maxSupply;
    uint256 private lastUnstakeTimestamp;
    bool public creatorRewardsUnstaked = false;

    struct QueueEntry {
        uint256 amount;
        address caller;
        bool isCreator;
    }

    QueueEntry private lastCaller;

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
        countdownEnd = block.timestamp + (_countdownDays * 1 minutes);
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

    function depositToStakedUSDeV2(uint256 amount) external {
        require(
            totalSupply() + (amount * rate) <= maxSupply,
            "Max supply reached"
        );
        usdeToken.safeTransferFrom(msg.sender, address(this), amount);
        usdeToken.approve(address(stakedUsdeV2), amount);
        stakedUsdeV2.deposit(amount, address(this));

        _mint(msg.sender, amount * rate);
    }

    function unstakeCreatorAllRewars() public onlyOwner  {
        uint256 shares = stakedUsdeV2.balanceOf(address(this));
        uint256 assets = stakedUsdeV2.convertToAssets(shares);
        uint256 tokens = totalSupply() / rate;
        uint256 rewards = assets - tokens;
        stakedUsdeV2.cooldownAssets(rewards);
        creatorRewardsUnstaked = true;
    }

    function unstakeCreatorReward() public onlyOwner  {
        stakedUsdeV2.unstake(address(this));
        uint256 rewards = usdeToken.balanceOf(address(this));
        usdeToken.transfer(owner(), rewards);
        creatorRewardsUnstaked = false;
    }

    function unstakeToken(uint256 amount) public  {
        if (lastCaller.amount > 0) {
            require(
                block.timestamp >= lastUnstakeTimestamp + 1 minutes,
                "Must wait 1 hour after unstaking"
            );
            withdrawalTokenReward();
        }
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");
        uint256 tokens = amount / rate;
        _burn(msg.sender, amount);
        stakedUsdeV2.cooldownAssets(tokens);
        lastCaller = QueueEntry(tokens, msg.sender, false);
        lastUnstakeTimestamp = block.timestamp;
    }

    function withdrawalTokenReward() public  {
        require(
            block.timestamp >= lastUnstakeTimestamp + 1 minutes,
            "Must wait 1 hour after unstaking"
        );
        stakedUsdeV2.unstake(address(this));
        usdeToken.safeTransfer(lastCaller.caller, lastCaller.amount);
        lastCaller = QueueEntry(0, address(0), false); // Reset lastCaller
    }

    function getData() public view returns(uint256){
        return block.timestamp;
    }

}
