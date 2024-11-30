// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {StakedUSDeMinter} from "./StakedUSDeMinter.sol";
import {StakedUSDeV2} from "./StakedUSDeV2.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakedUSDeMinterFactory {
    IERC20 public immutable usdeToken;
    StakedUSDeV2 public immutable stakedUsdeV2;
    event TokenCreated(address indexed tokenAddress, address indexed owner);
    mapping(address => address[]) public ownerLaunchpads;

    constructor(address _usdeTokenAddress, address _stakedUsdeV2) {
        usdeToken = IERC20(_usdeTokenAddress);
        stakedUsdeV2 = StakedUSDeV2(_stakedUsdeV2);
    }

    function createToken(
        string memory tokenName,
        string memory tokenSymbol,
        string memory _imageUrl,
        uint256 _countdownDays,
        uint16 _rate,
        uint256 _maxSupply,
        bytes32 salt
    ) external returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(StakedUSDeMinter).creationCode,
            abi.encode(
                tokenName,
                tokenSymbol,
                _imageUrl,
                msg.sender,
                usdeToken,
                stakedUsdeV2,
                _countdownDays,
                _rate,
                _maxSupply
            )
        );
        address stakedUSDeMinterAddress = Create2.deploy(0, salt, bytecode);
        ownerLaunchpads[msg.sender].push(stakedUSDeMinterAddress);
        emit TokenCreated(stakedUSDeMinterAddress, msg.sender);
        return stakedUSDeMinterAddress;
    }
}
