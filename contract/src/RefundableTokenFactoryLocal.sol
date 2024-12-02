// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {RefundableTokenLocal} from "./RefundableTokenLocal.sol";
import {StakedUSDeV2} from "./StakedUSDeV2.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RefundableTokenFactoryLocal {
    IERC20 public immutable usdeToken;
    StakedUSDeV2 public immutable stakedUsdeV2;
    address public latestToken;
    event TokenCreated(
        address indexed tokenAddress,
        address indexed owner,
        string imageUrl,
        uint256
    );

    //Constructor: The constructor initializes the usdeToken and stakedUsdeV2 properties with the provided addresses.
    constructor(address _usdeTokenAddress, address _stakedUsdeV2) {
        usdeToken = IERC20(_usdeTokenAddress);
        stakedUsdeV2 = StakedUSDeV2(_stakedUsdeV2);
    }

    //createToken function: This function is responsible for creating a new StakedUSDeMinter contract. It takes several parameters,
    //including the token name, symbol, image URL, countdown days, rate, maximum supply, and a salt.
    //The function encodes the parameters into a bytecode using the abi.encodePacked function. Then,
    //it deploys the StakedUSDeMinter contract using the Create2.deploy function with the provided salt and bytecode.
    //After the deployment, the contract address is stored in the ownerLaunchpads mapping for the current owner,
    //and the TokenCreated event is emitted. Finally, the function returns the address of the newly created StakedUSDeMinter contract.
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
            type(RefundableTokenLocal).creationCode,
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
        uint256 cuntdownEnd = block.timestamp + (_countdownDays * 1 minutes);
        emit TokenCreated(
            stakedUSDeMinterAddress,
            msg.sender,
            _imageUrl,
            cuntdownEnd
        );
        latestToken = stakedUSDeMinterAddress;
        return stakedUSDeMinterAddress;
    }
}
