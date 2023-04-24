// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct UserDetail {
        address addr;
        string username;
        string password;
        bool isUserLoggedIn;
    }

    // to map address of a user to its details
    mapping(address => UserDetail) user;

    // to store usernames for uniqueness
    mapping(string => uint256) usernames;

    // user registration function
    function register(
        string memory _username,
        string memory _password
    ) public returns (bool) {
        usernames[_username]++;
        require(usernames[_username] < 2, "Username already taken!");
        user[msg.sender].addr = msg.sender;
        user[msg.sender].username = _username;
        user[msg.sender].password = _password;
        user[msg.sender].isUserLoggedIn = false;
        return true;
    }

    // user login function
    function login(
        string memory _username,
        string memory _password
    ) public returns (bool) {
        require(
            keccak256(abi.encodePacked(user[msg.sender].username)) ==
                keccak256(abi.encodePacked(_username)) &&
                keccak256(abi.encodePacked(user[msg.sender].password)) ==
                keccak256(abi.encodePacked(_password)),
            "Login credentials are invalid"
        );
        user[msg.sender].isUserLoggedIn = true;
        return user[msg.sender].isUserLoggedIn;
    }

    function deactivateAccount(address _address) public returns (bool) {
        require(msg.sender == owner, "Only owner can deactivate account");
        require(user[_address].addr == _address, "User does not exist");
        usernames[user[_address].username] = 0;
        delete user[_address];
        return true;
    }

    // check the user logged In or not
    function checkIsUserLogged(address _address) public view returns (bool) {
        return (user[_address].isUserLoggedIn);
    }
}
