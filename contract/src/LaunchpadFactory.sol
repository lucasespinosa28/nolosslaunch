// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Launchpad} from "./Launchpad.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

contract LaunchpadFactory {
    event LaunchpadCreated(address indexed launchpadAddress, bytes32 salt);

    function createLaunchpad(
        string memory name,
        string memory symbol,
        address _Usde,
        address _sUSDe,
        address _stake,
        uint256 _countdownDays,
        uint256 _maxSupply,
        uint256 _rate,
        address initialOwner,
        bytes32 salt
    ) external returns (address) {
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
                initialOwner
            )
        );

        address launchpadAddress = Create2.deploy(0, salt, bytecode);

        emit LaunchpadCreated(launchpadAddress, salt);

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
        bytes32 salt
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
                initialOwner
            )
        );

        return Create2.computeAddress(salt, keccak256(bytecode));
    }
}