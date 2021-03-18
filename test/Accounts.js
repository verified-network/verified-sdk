// (c) Kallol Borah, 2021
// Test cases for Verified Accounts

const {ethers, Contract} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();

const ABDKMathQuad = artifacts.require('ABDKMathQuad');
const Client = artifacts.require('Client');
const Kyc = artifacts.require('Kyc');
const System = artifacts.require('System');
const Holder = artifacts.require('Holder');
const Ledger = artifacts.require('Ledger');
const Account = artifacts.require('Account');
const ViaFactory = '0xb93af95d3e38b4df4a3dd7e552a4434dc5f8d7ce'; //to do : replace with correct address

contract("Accounts system testing", async(accounts)=> {
    
    beforeEach(async()=>{
        var KYCedClient = await Client.deployed();
        await KYCedClient.setManager(accounts[1], accounts[0])
        .then(async()=>{
            await KYCedClient.getManager(accounts[1])
            .then(function(result){
                console.log("Set manager address for client " + accounts[0]);
            });
        });
    });

    beforeEach(async()=>{
        var ClientKYC = await Kyc.deployed();
        var KYCedClient = await Client.deployed();

        await ClientKYC.setStatus(accounts[1], ethers.utils.formatBytes32String("true"));
        console.log("Set KYC status for client as " + "true");
        await ClientKYC.getStatus(accounts[1])
        .then(function(KycStatus){
            console.log("Got KYC status for client as " + KycStatus);
        });

        await KYCedClient.setAccess(ethers.utils.formatBytes32String("true"));
        console.log("Logged in client as " + "true");
    });

    it("sets up account holder", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("abc"), accounts[1])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[1])
            .then(function(holderAddress){
                console.log("Account holder address is " + holderAddress);
            });
        });
    });
    
    it("creates ledger for account holder", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("CompanyABC"), accounts[1])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[1])
            .then(async(holderAddress)=>{
                console.log("Account holder address is " + holderAddress);
                AccountHolder = await Holder.at(holderAddress);
                await AccountHolder.createLedger(ethers.utils.formatBytes32String("Travel"), ethers.utils.formatBytes32String("IndirectExpenses"))
                .then(async()=>{
                    await AccountSystem.getAccountLedger(holderAddress)
                    .then(function(ledgerAddress){
                        console.log("Account ledger address is " + ledgerAddress);
                    });
                });
            });
        });
    });
    
    it("creates account in accounting ledger", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("CompanyABC"), accounts[1])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[1])
            .then(async(holderAddress)=>{
                console.log("Account holder address is " + holderAddress);
                AccountHolder = await Holder.at(holderAddress);
                await AccountHolder.createLedger(ethers.utils.formatBytes32String("Travel"), ethers.utils.formatBytes32String("IndirectExpenses"))
                .then(async()=>{
                    await AccountSystem.getAccountLedger(holderAddress)
                    .then(async(ledgerAddress)=>{
                        console.log("Account ledger address is " + ledgerAddress);
                        LedgerAccount = await Ledger.at(ledgerAddress);
                        await LedgerAccount.createAccount(ethers.utils.formatBytes32String("XYZTravels"), ethers.utils.formatBytes32String("USD"))
                        .then(async()=>{
                            await AccountSystem.getLedgerAccount(ledgerAddress)
                            .then(function(accountAddress){
                                console.log("Account address is " + accountAddress);
                            });
                        });
                    });
                });
            });
        });
    });
    
    it("posts entry in account", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("CounterpartyXYZ"), accounts[2])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[2])
            .then(async(counterPartyAddress)=>{
                console.log("Counter party address is " + counterPartyAddress);
                await AccountSystem.createHolder(ethers.utils.formatBytes32String("CompanyABC"), accounts[1])
                .then(async()=>{
                    await AccountSystem.getAccountHolder(accounts[1])
                    .then(async(holderAddress)=>{
                        console.log("Account holder address is " + holderAddress);
                        AccountHolder = await Holder.at(holderAddress);
                        await AccountHolder.createLedger(ethers.utils.formatBytes32String("Travel"), ethers.utils.formatBytes32String("IndirectExpenses"))
                        .then(async()=>{
                            await AccountSystem.getAccountLedger(holderAddress)
                            .then(async(ledgerAddress)=>{
                                console.log("Account ledger address is " + ledgerAddress);
                                AccountLedger = await Ledger.at(ledgerAddress);
                                await AccountLedger.createAccount(ethers.utils.formatBytes32String("XYZTravels"), ethers.utils.formatBytes32String("USD"))
                                .then(async()=>{
                                    await AccountSystem.getLedgerAccount(ledgerAddress)
                                    .then(async(accountAddress)=>{
                                        console.log("Account address is " + accountAddress);
                                        LedgerAccount = await Account.at(accountAddress);
                                        await LedgerAccount.postEntry(counterPartyAddress,
                                            ethers.utils.formatBytes32String("123456ABCD"),
                                            ethers.utils.parseUnits('100',3),
                                            ethers.utils.formatBytes32String("Credit"),
                                            ethers.utils.formatBytes32String("2020-12-15"),
                                            ethers.utils.formatBytes32String("Test transaction"),
                                            ethers.utils.formatBytes32String("Journal"))
                                        .then(function(result){
                                            console.log("A new entry is posted numbered ");
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
    it("gets entry in account", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("CounterpartyXYZ"), accounts[2])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[2])
            .then(async(counterPartyAddress)=>{
                console.log("Counter party address is " + counterPartyAddress);
                await AccountSystem.createHolder(ethers.utils.formatBytes32String("CompanyABC"), accounts[1])
                .then(async()=>{
                    await AccountSystem.getAccountHolder(accounts[1])
                    .then(async(holderAddress)=>{
                        console.log("Account holder address is " + holderAddress);
                        AccountHolder = await Holder.at(holderAddress);
                        await AccountHolder.createLedger(ethers.utils.formatBytes32String("Travel"), ethers.utils.formatBytes32String("IndirectExpenses"))
                        .then(async()=>{
                            await AccountSystem.getAccountLedger(holderAddress)
                            .then(async(ledgerAddress)=>{
                                console.log("Account ledger address is " + ledgerAddress);
                                AccountLedger = await Ledger.at(ledgerAddress);
                                await AccountLedger.createAccount(ethers.utils.formatBytes32String("XYZTravels"), ethers.utils.formatBytes32String("USD"))
                                .then(async()=>{
                                    await AccountSystem.getLedgerAccount(ledgerAddress)
                                    .then(async(accountAddress)=>{
                                        console.log("Account address is " + accountAddress);
                                        LedgerAccount = await Account.at(accountAddress);
                                        await LedgerAccount.postEntry(counterPartyAddress,
                                            ethers.utils.formatBytes32String("123456ABCD"),
                                            ethers.utils.parseUnits('100',3),
                                            ethers.utils.formatBytes32String("Credit"),
                                            ethers.utils.formatBytes32String("2020-12-15"),
                                            ethers.utils.formatBytes32String("Test transaction"),
                                            ethers.utils.formatBytes32String("Journal"))
                                        .then(async()=>{
                                            await LedgerAccount.getEntry(ethers.utils.formatBytes32String("123456ABCD"), ethers.utils.formatBytes32String("2020-12-15"))
                                            .then(function(result){
                                                console.log("Got posted entry with ledger "+result[0]
                                                            + ", counterparty "+result[1]
                                                            + ", amount "+ethers.utils.formatUnits(result[2])
                                                            + ", transaction type "+ethers.utils.parseBytes32String(result[3])
                                                            + ", description "+ethers.utils.parseBytes32String(result[4])
                                                            + ", voucher type "+ethers.utils.parseBytes32String(result[5]));
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
    it("updates trial balance statement", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("CounterpartyXYZ"), accounts[2])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[2])
            .then(async(counterPartyAddress)=>{
                console.log("Counter party address is " + counterPartyAddress);
                await AccountSystem.createHolder(ethers.utils.formatBytes32String("CompanyABC"), accounts[1])
                .then(async()=>{
                    await AccountSystem.getAccountHolder(accounts[1])
                    .then(async(holderAddress)=>{
                        console.log("Account holder address is " + holderAddress);
                        AccountHolder = await Holder.at(holderAddress);
                        await AccountHolder.createLedger(ethers.utils.formatBytes32String("Travel"), ethers.utils.formatBytes32String("IndirectExpenses"))
                        .then(async()=>{
                            await AccountSystem.getAccountLedger(holderAddress)
                            .then(async(ledgerAddress)=>{
                                console.log("Account ledger address is " + ledgerAddress);
                                AccountLedger = await Ledger.at(ledgerAddress);
                                await AccountLedger.createAccount(ethers.utils.formatBytes32String("XYZTravels"), ethers.utils.formatBytes32String("USD"))
                                .then(async()=>{
                                    await AccountSystem.getLedgerAccount(ledgerAddress)
                                    .then(async(accountAddress)=>{
                                        console.log("Account address is " + accountAddress);
                                        LedgerAccount = await Account.at(accountAddress);
                                        await LedgerAccount.postEntry(counterPartyAddress,
                                            ethers.utils.formatBytes32String("123456ABCD"),
                                            ethers.utils.parseUnits('100',3),
                                            ethers.utils.formatBytes32String("Credit"),
                                            ethers.utils.formatBytes32String("2020-12-15"),
                                            ethers.utils.formatBytes32String("Test transaction"),
                                            ethers.utils.formatBytes32String("Journal"))
                                        .then(async()=>{
                                            await AccountHolder.updateAccountStatement()
                                            .then(function(result){
                                                console.log("Trial balance statement is updated.");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
    it("fetches trial balance statement", async()=>{
        var AccountSystem = await System.deployed();
        await AccountSystem.createHolder(ethers.utils.formatBytes32String("CounterpartyXYZ"), accounts[2])
        .then(async()=>{
            await AccountSystem.getAccountHolder(accounts[2])
            .then(async(counterPartyAddress)=>{
                console.log("Counter party address is " + counterPartyAddress);
                await AccountSystem.createHolder(ethers.utils.formatBytes32String("CompanyABC"), accounts[1])
                .then(async()=>{
                    await AccountSystem.getAccountHolder(accounts[1])
                    .then(async(holderAddress)=>{
                        console.log("Account holder address is " + holderAddress);
                        AccountHolder = await Holder.at(holderAddress);
                        await AccountHolder.createLedger(ethers.utils.formatBytes32String("Travel"), ethers.utils.formatBytes32String("IndirectExpenses"))
                        .then(async()=>{
                            await AccountSystem.getAccountLedger(holderAddress)
                            .then(async(ledgerAddress)=>{
                                console.log("Account ledger address is " + ledgerAddress);
                                AccountLedger = await Ledger.at(ledgerAddress);
                                await AccountLedger.createAccount(ethers.utils.formatBytes32String("XYZTravels"), ethers.utils.formatBytes32String("USD"))
                                .then(async()=>{
                                    await AccountSystem.getLedgerAccount(ledgerAddress)
                                    .then(async(accountAddress)=>{
                                        console.log("Account address is " + accountAddress);
                                        LedgerAccount = await Account.at(accountAddress);
                                        await LedgerAccount.postEntry(counterPartyAddress,
                                            ethers.utils.formatBytes32String("123456ABCD"),
                                            ethers.utils.parseUnits('100',3),
                                            ethers.utils.formatBytes32String("Credit"),
                                            ethers.utils.formatBytes32String("2020-12-15"),
                                            ethers.utils.formatBytes32String("Test transaction"),
                                            ethers.utils.formatBytes32String("Journal"))
                                        .then(async()=>{
                                            await AccountHolder.updateAccountStatement()
                                            .then(async()=>{
                                                await AccountHolder.getEntries()
                                                .then(async(entries)=>{
                                                    console.log("Trial balance statement is updated with "+entries+" entries.");
                                                    await AccountHolder.getAccountStatement(entries-1)
                                                    .then(function(entry){
                                                        console.log("Trial balance ledger name is "+ethers.utils.parseBytes32String(entry[0])
                                                                    +", ledger group is "+ethers.utils.parseBytes32String(entry[1])
                                                                    +", ledger balance is "+ethers.utils.formatUnits(entry[2]));
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
});