// (c) Kallol Borah, 2021
// Records and reports transactions

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();
const wallet = new ethers.Wallet(signer.address, provider);

const accountingSystem = artifacts.require('VerifiedSystem');
const accountHolder = artifacts.require('VerifiedHolder');
const accountsLedger = artifacts.require('VerifiedLedger');
const account = artifacts.require('VerifiedAccount');
const AccountingSystemAddress = process.env.ACCOUNTS_SYSTEM;

// create an account holder with _name
export async function createAccountHolder(_name){
    holderName = $("#_name").val();
    const AccountSystem = new ethers.Contract(AccountingSystemAddress, accountingSystem, signer);
    await AccountSystem.createHolder(ethers.utils.formatBytes32String(holderName), wallet.address)
        .then(function(holderAddress){
            return holderAddress;
        });
}

// create a ledger with _ledgerName in _ledgerGroup for account holder with _holderAddress 
export async function createLedger(_ledgerName, _ledgerGroup, _holderAddress){
    ledgerName = $("#_ledgerName").val();
    ledgerGroup = $("#_ledgerGroup").val();
    const AccountHolder = new ethers.Contract($("#_holderAddress").val(), accountHolder, signer);
    await AccountHolder.createLedger(ethers.utils.formatBytes32String(ledgerName), ethers.utils.formatBytes32String(ledgerGroup))
        .then(function(ledgerAddress){
            return ledgerAddress;
        });
}

// create an account in _ledgerAddress with _accountName and _currency
export async function createAccount(_accountName, _currency, _ledgerAddress){
    accountName = $("#_accountName").val();
    currency = $("#_currency").val();
    const AccountsLedger = new ethers.Contract($("#_ledgerAddress").val(), accountsLedger, signer);
    await AccountsLedger.createAccount(ethers.utils.formatBytes32String(accountName), ethers.utils.formatBytes32String(currency))
        .then(function(accountAddress){
            return accountAddress;
        });
}

// post an account entry for _accountAddress
export async function postEntry(_counterParty, _accountNumber, _txAmount, _txType, _txDate, _txDescription, _vchType, _accountAddress){
    counterParty = $("#_counterParty").val();
    accountNumber = $("#_accountNumber").val();
    txAmount = $("#_txAmount").val();
    txType = $("#_txType").val();
    txDate = $("#_txDate").val();
    txDescription = $("#_txDescription").val();
    vchType = $("#_vchType").val();
    const Account = new ethers.Contract($("#_accountAddress").val(), account, signer);
    await Account.postEntry(ethers.utils.getAddress(counterParty),
                            ethers.utils.formatUnits(accountNumber),
                            ethers.utils.formatUnits(txAmount),
                            ethers.utils.formatBytes32String(txType),
                            ethers.utils.formatBytes32String(txDate),
                            ethers.utils.formatBytes32String(txDescription),
                            ethers.utils.formatBytes32String(vchType))
                .then(function(result){
                    return result;
                });
}

// get an account entry for _accountAddress
export async function getEntry(_accountNumber, _txDate, _accountAddress){
    accountNumber = $("#_accountNumber").val();
    txDate = $("#_txDate").val();
    const Account = new ethers.Contract($("#_accountAddress").val(), account, signer);
    Account.getEntry(ethers.utils.formatUnits(accountNumber), ethers.utils.formatBytes32String(txDate))
        .then(function(result){
            return result;
        });
}

// update an account statement for _holderAddress
export async function updateAccountStatement(_holderAddress){
    const AccountHolder = new ethers.Contract($("#_holderAddress").val(), accountHolder, signer);
    await AccountHolder.updateAccountStatement()
        .then(function(result){
            return result;
        });
}

// get an account statement for _holderAddress
export async function getAccountStatement(_holderAddress, _index){
    index = $("#_index").val();
    const AccountHolder = new ethers.Contract($("#_holderAddress").val(), accountHolder, signer);
    await AccountHolder.getAccountStatement(ethers.utils.formatUnits(index))
        .then(function(result){
            return result;
        });
}


