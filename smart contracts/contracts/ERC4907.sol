// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1; 

import "./fyprentable.sol";

contract ERC4907Demo is ERC4907 {

    constructor(string memory name_, string memory symbol_)
     ERC4907(name_,symbol_)
     {         
     }

    function mint(uint256 tokenId, address to) public {
        _mint(to, tokenId);
    }

} 