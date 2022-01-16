// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    // "address" is the type, "from" is the name of the variable
    // this event actually allows us to send and receive ETH
    event Transfer( address from, address receiver, uint amount, string message,
        uint256 timestamp, string keywork );

    struct TransferStruct {
        address sender; // type - name
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // basically, "transactions" is an array of TransferStruct objects
    TransferStruct[] transactions;

    function addToBlockchain( address payable receiver, uint amount, string memory message, string memory keyword ) public {
        transactionCount += 1;
        transactions.push( TransferStruct(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        ) );

        // we emit the event to actually "do" the transaction
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // These 2 functions ( view! ) only return some data, we won't modify the contract with them
    function getAllTransactions() public view returns ( TransferStruct[] memory ) {
        return transactions;
    }

    function getTransactionsCount() public view returns ( uint256 ) {
        return transactionCount;
    }
}