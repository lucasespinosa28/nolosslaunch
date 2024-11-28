// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "./interfaces/IUSDeDefinitions.sol";

/**
 * @title USDe
 * @notice USDe Genesis Story: Arthur Hayes' $Nakadollar in "Dust on Crust" 08/03/2023
 */
contract USDe is Ownable2Step, ERC20Burnable, ERC20Permit, IUSDeDefinitions {
  address public minter;

  constructor(address admin) ERC20("USDe", "USDe") ERC20Permit("USDe") Ownable(admin){
    if (admin == address(0)) revert ZeroAddressException();
    _transferOwnership(admin);
  }

  function setMinter(address newMinter) external {
    emit MinterUpdated(newMinter, minter);
    minter = newMinter;
  }

  function mint(address to, uint256 amount) external {
    _mint(to, amount);
  }

  function renounceOwnership() public view override onlyOwner {
    revert CantRenounceOwnership();
  }
}
