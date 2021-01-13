// (c) Kallol Borah, 2021
// Records and reports transactions

const {ethers} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();

const accountingSystem = artifacts.require('VerifiedSystem');
const accountHolder = artifacts.require('VerifiedHolder');
const accountsLedger = artifacts.require('VerifiedLedger');
const account = artifacts.require('VerifiedAccount');
const AccountingSystemAddress = process.env.ACCOUNTS_SYSTEM;
const Accounts = new ethers.Contract(AccountingSystemAddress, accountingSystem, signer);

function createAccountHolder(name, creator){
    
}

function recordTransaction(accountHolder, ledger, account, amount, currency){

}

function getStatement(accountHolder, ledger, account){

}

