// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Supply_Chain {
    
    mapping(address => uint) balances;

    address buyer;
    address seller;
    address distributor;
    bool buyerConf;
    bool sellerConf;
    address custodian;
    bool isValid;
    uint stakeValue;
    uint rewardValue; 
    uint itemValue;
    bool transferState;
    uint liquidityPool;

    constructor() {
        buyer = address($BUYER_ADDRESS);
        seller = address($SELLER_ADDRESS);
        distributor = address($DISTRIBUTOR_ADDRESS);
        buyerConf = false;
        sellerConf = false;
        custodian = address(seller);
        isValid = true;
        stakeValue = 1;
        rewardValue = 1;
        itemValue = 1;
        transferState = false;
        liquidityPool = 0;
    }

    // Getters and setters ///////////////////////////////

    function setItemValue(uint itemValue_) public {
        itemValue = itemValue_;
    }

    function getItemValue() public view returns(uint) {
        return itemValue;
    }

    function setDistributor(address distributor_) public {
        distributor = address(distributor_);
    }

    function getDistributor() public view returns(address) {
        return distributor;
    }

    function setStakeValue(uint stakeValue_) public {
        stakeValue = stakeValue_;
    }

    function getStakeValue() public view returns(uint) {
        return stakeValue;
    }

    function setRewardValue(uint rewardValue_) public {
        rewardValue = rewardValue_;
    }

    function getRewardValue() public view returns(uint) {
        return  rewardValue;
    }

    function setValid(bool isValid_) public {
        isValid = isValid_;
    }

    function verify() private view returns (bool) {
        return isValid;
    }

    function getTransferState() public view returns(bool) {
        return transferState;
    }

    function setTransferState(bool transferState_) public {
        transferState = transferState_;
    }

    function getBalance() public view returns(uint) {
        return balances[address(msg.sender)];
    }

    function getBalanceOf(address a) public view returns(uint) {
        return balances[address(a)];
    }

    function getCustodian() public view returns(address) {
        return custodian;
    }
    //////////////////////////////////////////////////////////////////////////

    function deposit() public payable {
        balances[address(msg.sender)] += msg.value;
    }

    function confirmBuyer() public {
        require(!buyerConf, "Buyer already confirmed!");
        require(sellerConf, "Seller must be confirmed!");
        require(balances[msg.sender] >= rewardValue + itemValue, "Insufficient funds for reward.");
        address buyer = address(msg.sender);
        buyerConf = true;
        transferFunds(rewardValue, buyer, address(this));
    }
    
    function confirmSeller() public {
        require(!sellerConf, "Seller already confirmed!");
        require(balances[address(msg.sender)] >= rewardValue, "Insufficient funds.");
        transferFunds(rewardValue, seller, address(this));
        sellerConf = true;
        custodian = address(msg.sender);
    }

    function confirmDistributor() public {
        require(buyerConf && sellerConf, "Buyer or Seller has not confirmed yet.");
        require(balances[address(msg.sender)] >= stakeValue, "Insufficient funds.");
        transferFunds(stakeValue, address(msg.sender), address(this));
    }

    function custodianFail() private {
        require(!isValid, "Item state is valid.");
        uint slashedBalance = balances[address(custodian)];
        transferFunds(stakeValue, address(this), buyer);
        // return stakes to other distributors if there are any
    }

    function custodianSucceed() private {
        require(isValid, "Item state is invalid.");
        transferFunds(rewardValue, seller, custodian);
        transferFunds(rewardValue, buyer, custodian);
        transferFunds(stakeValue, address(this), custodian);
        isValid = false;
    }

    function transferFunds(uint amount, address from, address to) private {
        require(balances[from] >= amount, "Insufficient funds.");
        balances[address(from)] -= amount;
        balances[address(to)] += amount;
    }

    function initTransfer() public {
        require(!transferState, "Transfer is already initiated!");
        require(address(msg.sender) == custodian, "Must be custodian to transfer!");
        if(isValid){
            custodianSucceed();
        }else {
            custodianFail();
        }
        transferState = true;
    }

    function confirmTransfer() public {
        require(transferState, "Transfer must be intiated!");
        transferState = false;
        custodian = address(msg.sender);

    }
}