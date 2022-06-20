// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.11;

contract  VendingMachine{
  
  address public owner;
  mapping(address=>uint) public donutBalances;
  constructor(){
     owner=msg.sender;
     donutBalances[address(this)]=100;
  }
  function  getVendingMachineBalance() public view returns(uint){

    return donutBalances[address(this)];
  } 
  function restock(uint amount) public{
     require( owner==msg.sender,"Only the owner is allowed to restock this machine.");
     donutBalances[address(this)]+=amount;

  }
  function purchase(uint amount) public payable{
        // change to real price if you want to deploy in testnet
        require(msg.value >= amount * 2 ether, "You have to pay at least 2 ETH per donut");
        require(donutBalances[address(this)]>=amount,"Not enought donus in stock to buy");
        
        donutBalances[address(this)]=donutBalances[address(this)]-amount;
        donutBalances[msg.sender]=donutBalances[msg.sender]+amount; 

  }

}