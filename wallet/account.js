// (c) Kallol Borah, 2021
// Records and reports transactions

const wallet = require('../index');

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();

const System = require('../abi/accounts/System.json');
const Holder = require('../abi/accounts/Holder.json');
const Ledger = require('../abi/accounts/Ledger.json');
const Account = require('../abi/accounts/Account.json');

const AccountingSystemAddress = process.env.ACCOUNTS_SYSTEM;

module.exports = {
    // create an account holder with _name
    createAccountHolder : async function(_name){
        holderName = $("#_name").val();
        var AccountSystem = new ethers.Contract(AccountingSystemAddress, System, provider);
        await AccountSystem.createHolder(ethers.utils.formatBytes32String(holderName), wallet.address)
        .then(async()=>{
            await AccountSystem.getAccountHolder(wallet.address)
            .then(function(holderAddress){
                return holderAddress;
            });
        });
    },

    // create a ledger with _ledgerName in _ledgerGroup for account holder with _holderAddress 
    createLedger : async function(_ledgerName, _ledgerGroup, _holderAddress){
        ledgerName = $("#_ledgerName").val();
        ledgerGroup = $("#_ledgerGroup").val();
        holderAddress = $("#_holderAddress").val();
        var AccountSystem = new ethers.Contract(AccountingSystemAddress, System, provider);
        var AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
        await AccountHolder.createLedger(ethers.utils.formatBytes32String(ledgerName), ethers.utils.formatBytes32String(ledgerGroup))
        .then(async()=>{
            await AccountSystem.getAccountLedger(wallet.address,holderAddress)
            .then(function(ledgerAddress){
                return ledgerAddress;
            });
        });
    },

    // create an account in _ledgerAddress with _accountName and _currency
    createAccount : async function(_accountName, _currency, _ledgerAddress){
        accountName = $("#_accountName").val();
        currency = $("#_currency").val();
        ledgerAddress = $("#_ledgerAddress").val();
        var AccountSystem = new ethers.Contract(AccountingSystemAddress, System, provider);
        var AccountsLedger = new ethers.Contract(ledgerAddress, Ledger, provider);
        await AccountsLedger.createAccount(ethers.utils.formatBytes32String(accountName), ethers.utils.formatBytes32String(currency))
        .then(async()=>{
            await AccountSystem.getLedgerAccount(wallet.address,ledgerAddress)
            .then(function(accountAddress){
                return accountAddress;
            });
        });
    },

    // post an account entry for _accountAddress
    postEntry : async function(_counterParty, _accountNumber, _txAmount, _txType, _txDate, _txDescription, _vchType, _accountAddress){
        counterParty = $("#_counterParty").val();
        accountNumber = $("#_accountNumber").val();
        txAmount = $("#_txAmount").val();
        txType = $("#_txType").val();
        txDate = $("#_txDate").val();
        txDescription = $("#_txDescription").val();
        vchType = $("#_vchType").val();
        accountAddress = $("#_accountAddress").val();
        var LedgerAccount = new ethers.Contract(accountAddress, Account, provider);
        await LedgerAccount.postEntry(counterParty,
            ethers.utils.formatBytes32String(accountNumber),
            ethers.utils.parseUnits(txAmount,3),
            ethers.utils.formatBytes32String(txType),
            ethers.utils.formatBytes32String(txDate),
            ethers.utils.formatBytes32String(txDescription),
            ethers.utils.formatBytes32String(vchType))
        .then(function(result){
            result = true;
            return result;
        });
    },

    // get an account entry for _accountAddress
    getEntry : async function(_accountNumber, _txDate, _accountAddress){
        accountNumber = $("#_accountNumber").val();
        txDate = $("#_txDate").val();
        accountAddress = $("#_accountAddress").val();
        const Account = new ethers.Contract(accountAddress, Account, provider);
        Account.getEntry(ethers.utils.formatBytes32String(accountNumber), ethers.utils.formatBytes32String(txDate))
        .then(function(result){
            return result;
        });
    },

    // gets number of entries in trial balance statement for _holderAddress
    getEntries : async function(_holderAddress){
        holderAddress = $("#_holderAddress").val();
        const AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
        await AccountHolder.getEntries()
        .then(function(result){
            return result;
        });
    },

    // update an account statement for _holderAddress
    updateAccountStatement : async function(_holderAddress){
        holderAddress = $("#_holderAddress").val();
        const AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
        await AccountHolder.updateAccountStatement()
        .then(function(result){
            result = true;
            return result;
        });
    },

    // get an account statement for _holderAddress
    getAccountStatement : async function(_holderAddress, _index){
        index = $("#_index").val();
        holderAddress = $("#_holderAddress").val();
        const AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
        await AccountHolder.getAccountStatement(ethers.utils.formatUnits(index))
        .then(function(result){
            return result;
        });
    }
};

