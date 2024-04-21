// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.24;

contract TruView {
    struct StakeHolder {
        string name;
        string password;
        string userRole;
        address userAddress;
    }

    struct TransactionData {
        address signatureAddress;
        address recipientAddress;
        uint256 txnHashIndex;
        uint256 timeStamp;
    }
    //hash can be stored directly in struct without using arrays in the up directory(UNRESOLVED)
    struct DocumentData {
        address signatureAddress;
        address recipientAddress;
        uint256 ipfsHashIndex;
        uint256 timeStamp;
    }

    //GLOBAL STRUCT
    struct Project {
        StakeHolder[] stakeholderArray;
        bytes32[] paymentHash;
        string[] documentHash;
        TransactionData[] txnHistory;
        DocumentData[] docHistory;
    }

    Project private truView;
    TransactionData transactionData;
    DocumentData documentData;

    address public clientAddress;

    function registerUser(
        string memory _name,
        string memory _password,
        string memory _user
    ) public {
        // Create a new StakeHolder struct and add it to the array
        truView.stakeholderArray.push(
            createRegistrationStruct(_name, _password, _user)
        );
    }

    function createRegistrationStruct(
        string memory _name,
        string memory _password,
        string memory _user
    ) internal returns (StakeHolder memory) {
        // Create a new StakeHolder struct and return it
        if (
            keccak256(abi.encodePacked(_user)) ==
            keccak256(abi.encodePacked("client"))
        ) {
            clientAddress = msg.sender;
        }
        StakeHolder memory _stakeholder = StakeHolder({
            name: _name,
            password: _password,
            userRole: _user,
            userAddress: msg.sender
        });

        return _stakeholder;
    }

    function getStakeHolder(
        uint256 index
    ) public view returns (StakeHolder memory) {
        return truView.stakeholderArray[index];
    }

    function checkRegisteredUser(
        string memory _name,
        string memory _password
    ) public view returns (bool) {
        if (
            keccak256(abi.encodePacked(truView.stakeholderArray[0].name)) ==
            keccak256(abi.encodePacked(_name)) &&
            keccak256(abi.encodePacked(truView.stakeholderArray[0].password)) ==
            keccak256(abi.encodePacked(_password)) &&
            truView.stakeholderArray[0].userAddress == msg.sender
        ) {
            return true;
        } else {
            return false;
        }
    }

    //to access the transaction hash, use JS
    //hash cannot be accessed inside the contract
    function sendTransaction(address payable _recipient) public payable {
        // Attempt to send the payment
        bool success = _recipient.send(msg.value);

        // If the send function returns false, revert the transaction
        require(success, "Payment failed");

        timeStamp = block.timestamp;

        //extract txnhash from JS and call storeTxnHash() function
        //check sender and recipient and hash and store ing TransactionHistory
    }

    uint256 private timeStamp;

    function storeTxnHistory(address _recipient, bytes32 _txnHash) public {
        truView.paymentHash.push(_txnHash);
        uint256 paymentHashIndex = truView.paymentHash.length - 1;
        truView.txnHistory.push(
            createTxnHistoryStruct(
                msg.sender,
                _recipient,
                paymentHashIndex,
                timeStamp
            )
        );
    }

    function createTxnHistoryStruct(
        address _sender,
        address _recipient,
        uint256 _txnHashIndex,
        uint256 _timestamp
    ) internal pure returns (TransactionData memory) {
        // Create a new TransactionData struct and return it

        TransactionData memory _transactionData = TransactionData({
            signatureAddress: _sender,
            recipientAddress: _recipient,
            txnHashIndex: _txnHashIndex,
            timeStamp: _timestamp
        });

        return _transactionData;
    }

    function getTxnHistory(
        uint256 index
    ) public view returns (TransactionData memory) {
        return truView.txnHistory[index];
    }

    function storeDocHistory(
        address _recipient,
        string calldata _ipfsHash
    ) public {
        truView.documentHash.push(_ipfsHash);
        uint256 documentHashIndex = truView.documentHash.length - 1;
        truView.txnHistory.push(
            createTxnHistoryStruct(
                msg.sender,
                _recipient,
                documentHashIndex,
                timeStamp
            )
        );
    }
    //these two functions can be nested
    function createDocHistoryStruct(
        address _sender,
        address _recipient,
        uint256 _ipfsHashIndex,
        uint256 _timestamp
    ) internal pure returns (DocumentData memory) {
        // Create a new TransactionData struct and return it

        DocumentData memory _documentData = DocumentData({
            signatureAddress: _sender,
            recipientAddress: _recipient,
            ipfsHashIndex: _ipfsHashIndex,
            timeStamp: _timestamp
        });

        return _documentData;
    }

    function getDocHistory(
        uint256 index
    ) public view returns (DocumentData memory) {
        return truView.docHistory[index];
    }

    function getProject() public view returns (Project memory) {
        return truView;
    }
}
