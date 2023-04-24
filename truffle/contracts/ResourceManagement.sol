// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResourceManagement {
    // structure to store the files of a user
    struct UserFiles {
        string[] ipfsHash;
        address addr;
    }

    mapping(address => UserFiles) UserData;

    // To access files from user address
    function AccessFiles(address addr) public view returns (string[] memory) {
        return UserData[addr].ipfsHash;
    }

    function AddFiles(string memory file) public {
        UserData[msg.sender].ipfsHash.push(file);
    }
}
