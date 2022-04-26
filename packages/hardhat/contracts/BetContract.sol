// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract BetContract {
    mapping(address => uint256) public balanceOf;

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //Send ether from the account connected with this function
    function depositViaCall() public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        balanceOf[msg.sender] += msg.value;
    }

    //Withdraw Ether from the contract
    function withdrawETH(uint256 amount) public {
        balanceOf[msg.sender] -= amount;

        (bool succeed, bytes memory data) = msg.sender.call{value: amount}("");
        require(succeed, "Failed to withdraw Ether");
    }
}
