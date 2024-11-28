// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Launchpad} from "./Launchpad.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {StakedUSDeV2} from "./StakedUSDeV2.sol";

contract LaunchpadFactory {
    IERC20 public immutable usdeToken;
    StakedUSDeV2 public immutable stakedUsdeV2;
    event LaunchpadCreated(
        address indexed launchpadAddress,
        address indexed initialOwner
    );
    mapping(address => address[]) public ownerLaunchpads;

    function createLaunchpad(
        string memory tokenName,
        string memory tokenSymbol,
        address _Usde,
        address _sUSDe,
        address _stake,
        uint256 _countdownDays,
        uint256 _maxSupply,
        uint256 _rate,
        address initialOwner,
        bytes32 salt,
        bytes32 imageUrl
    ) external returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(Launchpad).creationCode,
            abi.encode(
                tokenName,
                tokenSymbol,
                _Usde,
                _sUSDe,
                _stake,
                _countdownDays,
                _maxSupply,
                _rate,
                initialOwner,
                imageUrl
            )
        );

        address launchpadAddress = Create2.deploy(0, salt, bytecode);
        ownerLaunchpads[initialOwner].push(launchpadAddress);
        emit LaunchpadCreated(launchpadAddress, initialOwner);
        return launchpadAddress;
    }

    function predictLaunchpadAddress(
        string memory name,
        string memory symbol,
        address _Usde,
        address _sUSDe,
        address _stake,
        uint256 _countdownDays,
        uint256 _maxSupply,
        uint256 _rate,
        address initialOwner,
        bytes32 salt,
        bytes32 _imageUr
    ) external view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(Launchpad).creationCode,
            abi.encode(
                name,
                symbol,
                _Usde,
                _sUSDe,
                _stake,
                _countdownDays,
                _maxSupply,
                _rate,
                initialOwner,
                _imageUr
            )
        );

        return Create2.computeAddress(salt, keccak256(bytecode));
    }

    function getLaunchpadsByOwner(
        address owner
    ) external view returns (address[] memory) {
        return ownerLaunchpads[owner];
    }
}
