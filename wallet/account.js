// (c) Kallol Borah, 2021
// Records accounts and reports transactions

const wallet = require('../index');

const {ethers} = require ("ethers");

let abi = [

];

const AccountingSystemAddress = '0xc89aDc6E667f28c5Aeb4B9C3f97738fcd9a73fA7';//process.env.ACCOUNTS_SYSTEM;

module.exports = {
    // create an account holder with _name
    createAccountHolder : async function(_name){
        try{
            holderName = $("#_name").val();
            var AccountSystem = new ethers.Contract(AccountingSystemAddress, System, provider);
            await AccountSystem.createHolder(ethers.utils.formatBytes32String(holderName), wallet.address)
            .then(async()=>{
                await AccountSystem.getAccountHolder(wallet.address)
                .then(function(holderAddress){
                    return holderAddress;
                });
            });
        }catch(err){
            console.log(err);
        }
    },

    // create a ledger with _ledgerName in _ledgerGroup for account holder with _holderAddress 
    createLedger : async function(_ledgerName, _ledgerGroup, _holderAddress){
        try{
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
        }catch(err){
            console.log(err);
        }
    },

    // create an account in _ledgerAddress with _accountName and _currency
    createAccount : async function(_accountName, _currency, _ledgerAddress){
        try{
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
        }catch(err){
            console.log(err);
        }
    },

    // post an account entry for _accountAddress
    postEntry : async function(_counterParty, _accountNumber, _txAmount, _txType, _txDate, _txDescription, _vchType, _accountAddress){
        try{
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
        }catch(err){
            console.log(err);
        }
    },

    // get an account entry for _accountAddress
    getEntry : async function(_accountNumber, _txDate, _accountAddress){
        try{
            accountNumber = $("#_accountNumber").val();
            txDate = $("#_txDate").val();
            accountAddress = $("#_accountAddress").val();
            const Account = new ethers.Contract(accountAddress, Account, provider);
            Account.getEntry(ethers.utils.formatBytes32String(accountNumber), ethers.utils.formatBytes32String(txDate))
            .then(function(result){
                return result;
            });
        }catch(err){
            console.log(err);
        }
    },

    // gets number of entries in trial balance statement for _holderAddress
    getEntries : async function(_holderAddress){
        try{
            holderAddress = $("#_holderAddress").val();
            const AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
            await AccountHolder.getEntries()
            .then(function(result){
                return result;
            });
        }catch(err){
            console.log(err);
        }
    },

    // update an account statement for _holderAddress
    updateAccountStatement : async function(_holderAddress){
        try{
            holderAddress = $("#_holderAddress").val();
            const AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
            await AccountHolder.updateAccountStatement()
            .then(function(result){
                result = true;
                return result;
            });
        }catch(err){
            console.log(err);
        }
    },

    // get an account statement for _holderAddress
    getAccountStatement : async function(_holderAddress, _index){
        try{
            index = $("#_index").val();
            holderAddress = $("#_holderAddress").val();
            const AccountHolder = new ethers.Contract(holderAddress, Holder, provider);
            await AccountHolder.getAccountStatement(ethers.utils.formatUnits(index))
            .then(function(result){
                return result;
            });
        }catch(err){
            console.log(err);
        }
    }
};

