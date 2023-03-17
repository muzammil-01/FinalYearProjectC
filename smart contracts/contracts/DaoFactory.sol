// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./Dao.sol";

contract SimpleDaoFactory {
    address[] public deployedDaos;

    function createDao() public returns (address) {
        Dao newDao = new Dao(msg.sender);
        deployedDaos.push(address(newDao));
        return address(newDao);
    }

    function getDeployedDaos() public view returns (address[] memory) {
        return deployedDaos;
    }
}
