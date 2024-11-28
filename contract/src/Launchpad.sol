// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MockStake} from "./MockStake.sol";

contract Launchpad is ERC20, Ownable {
    address private immutable Usde;
    address private immutable sUSDe;
    MockStake private immutable stake;
    uint256 public immutable countdownEnd;
    bool private hasUnstaked;
    uint256 public immutable maxSupply;
    uint256 public immutable rate;
    bytes32  public imageUr;

    event Deposited(
        address indexed user,
        uint256 usdeAmount,
        uint256 launchpadTokens
    );
    event WithdrawnUSDe(
        address indexed user,
        uint256 usdeAmount,
        uint256 launchpadTokens
    );

    constructor(
        string memory name,
        string memory symbol,
        address _Usde,
        address _sUSDe,
        address _stake,
        uint256 _countdownDays,
        uint256 _maxSupply,
        uint256 _rate,
        address initialOwner,
        bytes32 _imageUr
    ) ERC20(name, symbol) Ownable(initialOwner) {
        Usde = _Usde;
        stake = MockStake(_stake);
        sUSDe = _sUSDe;
        countdownEnd = block.timestamp + (_countdownDays * 1 days);
        maxSupply = _maxSupply;
        rate = _rate;
        imageUr  =_imageUr;
    }

    modifier countdownEnded() {
        require(block.timestamp >= countdownEnd, "Countdown has not ended yet");
        _;
    }

    modifier countdownNotEnded() {
        require(block.timestamp < countdownEnd, "Countdown has ended");
        _;
    }

    function deposit(uint256 amount) external countdownNotEnded {
        uint256 tokensToMint = amount * rate;
        require(
            totalSupply() + tokensToMint <= maxSupply,
            "Max supply reached"
        );
        require(
            IERC20(Usde).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        IERC20(Usde).approve(address(stake), amount);
        stake.deposit(amount, address(this));
        _mint(msg.sender, tokensToMint);
        emit Deposited(msg.sender, amount, tokensToMint);
    }

    function cooldownAllShares() external countdownEnded {
        uint256 balance = IERC20(sUSDe).balanceOf(address(this));
        stake.cooldownShares(balance);
    }

    function unstake() external countdownEnded {
        require(!hasUnstaked, "Already unstaked");

        uint256 balance = IERC20(sUSDe).balanceOf(address(this));
        IERC20(sUSDe).approve(address(stake), balance);

        stake.unstake(address(this));
        uint256 amount = IERC20(Usde).balanceOf(address(this));
        IERC20(Usde).transfer(owner(), amount - (totalSupply() / rate));

        hasUnstaked = true;
    }

    function withdraw(uint256 amount) external countdownEnded {
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient Launchpad tokens"
        );
        require(hasUnstaked, "Unstaking has not occurred yet");

        uint256 usdeAmount = amount / rate;

        // Burn the Launchpad tokens
        _burn(msg.sender, amount);

        // Transfer the corresponding amount of USDe to the user
        require(
            IERC20(Usde).transfer(msg.sender, usdeAmount),
            "USDe transfer failed"
        );

        emit WithdrawnUSDe(msg.sender, usdeAmount, amount);
    }
}
