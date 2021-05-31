// Kallol Borah, 2021
// Test cases for Pre-trade, Trade and Post-trade transactions

const {ethers, Contract} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();

const PreTrade = artifacts.require('PreTrade');
const SecuritiesRegistry = artifacts.require('SecuritiesRegistry');
const PoolFactory = artifacts.require('PoolFactory');
const OrderPool = artifacts.require('OrderPool');
const Trade = artifacts.require('Trade');
const PostTrade = artifacts.require('PostTrade');
const Client = artifacts.require('VerifiedClient');
const KYC = artifacts.require('VerifiedKYC');

contract("Trade contracts", async(accounts)=> {

    const dpid = "XYZ1234";

    it("Sets manager and KYC status for client", async()=>{
        var KYCedClient = await Client.at('0x6d1b2226BbdFC7E4eDe55676b13fFa74521cB966');
        var ClientKYC = await KYC.at('0x17EA861E47EAdd16AEE1b3E85F750F05bA91fEA2');

        await KYCedClient.setManager(accounts[1], accounts[0])
        .then(async()=>{
            await KYCedClient.getManager(accounts[1])
            .then(async(manager)=>{
                console.log("Got client's manager address as " + manager);
                await ClientKYC.setStatus(accounts[1], ethers.utils.formatBytes32String("true"))
                .then(async()=>{
                    await ClientKYC.getStatus(accounts[1])
                    .then(async(KycStatus)=>{
                        console.log("Got KYC status for client as " + KycStatus);
                        await KYCedClient.addRole(accounts[2], ethers.utils.formatBytes32String("IN"), ethers.utils.formatBytes32String("DP"), {from:accounts[0]})
                        .then(function(){
                            console.log("Set role for " + accounts[2] + " as depositary participant (DP).");  
                        })
                    });
                });
            });
        });

        await KYCedClient.setManager(accounts[3], accounts[0])
        .then(async()=>{
            await KYCedClient.getManager(accounts[3])
            .then(async(manager)=>{
                console.log("Got client's manager address as " + manager);
                await ClientKYC.setStatus(accounts[3], ethers.utils.formatBytes32String("true"))
                .then(async()=>{
                    await ClientKYC.getStatus(accounts[3])
                    .then(function(KycStatus){
                        console.log("Got KYC status for client as " + KycStatus);
                    });
                });
            });
        });
    });
    
    it("Register demat account", async()=>{
        const user = accounts[1];
        const manager = accounts[0];
        const dp = accounts[2];

        var Pretrade = await PreTrade.deployed();
        await Pretrade.registerDematAccount(ethers.utils.formatBytes32String("VXINR"), {from: user})
        .then(async()=>{
            await Pretrade.getRegistrationRequests(ethers.utils.formatBytes32String("IN"), {from: dp})
            .then(async(regRequests)=>{
                const[val, ...rest]=regRequests;
                console.log("Received demat account registration request ref no " + val);
                await Pretrade.getRegistrationRequest(val, {from: dp})
                .then(async(regRequest)=>{
                    const{user, countryCode, dematAccountNo, DPID, regDate} = regRequest;
                    console.log("Going to set demat account for user " + user + " in country " + countryCode);
                    await Pretrade.setRegistrationStatus(val, ethers.utils.formatBytes32String(dpid), ethers.utils.formatBytes32String("1234"), {from: dp})
                    .then(function(){
                        console.log("Set demat account.");
                    });
                });
            });
        });
    });
    
    it("Confirm securities in demat account", async()=>{
        const user = accounts[1];
        const manager = accounts[0];
        const dp = accounts[2];

        var Pretrade = await PreTrade.deployed();
        await Pretrade.registerSecurities(ethers.utils.formatBytes32String("VXINR"), 
                                            ethers.utils.formatBytes32String("Free"),
                                            ethers.utils.formatBytes32String("INISIN0000"),
                                            ethers.utils.formatBytes32String("Jio"),
                                            ethers.utils.formatBytes32String("Equity"),
                                            ethers.utils.parseUnits('1000',3),
                                            ethers.utils.parseUnits('100',3),
                                            ethers.utils.formatBytes32String(""),
                                            ethers.utils.parseUnits('0',3),
                                            {from: user})
        .then(async()=>{
            await Pretrade.getConfirmationRequests(ethers.utils.formatBytes32String("IN"), {from: dp})
            .then(async(confirmationRequests)=>{
                const[ref, ...rest]=confirmationRequests;
                console.log("Received securities confirmation request " + ref);
                await Pretrade.getConfirmationRequest(ref, {from: dp})
                .then(async(confirmationRequest)=>{
                    const{a, b, requestor} = confirmationRequest;
                    console.log("Received securities data for user " + requestor);
                    await Pretrade.confirmSecurities(user, ref, ethers.utils.formatBytes32String("Confirmed"), {from: dp})
                    .then(function(){
                        console.log("Confirmed securities.");
                    });
                });
            });
        });
    });
    
    it("Managing orders", async()=>{
        const user = accounts[1];
        const manager = accounts[0];
        const dp = accounts[2];
        
        var registry = await SecuritiesRegistry.deployed();
        var factory = await PoolFactory.deployed();
        var pool = await OrderPool.deployed();

        var inrcashtokenaddress = '0x37241d8d1b0d13427BAcE5C95654a24A2221041C';

        await registry.getToken(ethers.utils.formatBytes32String("VXINR"), ethers.utils.formatBytes32String("Jio"),
                                ethers.utils.formatBytes32String("INISIN0000"), {from: user})
        .then(async(security)=>{
            console.log("Tokenized security address is " + security);         
            await factory.getPool(security, inrcashtokenaddress, {from: user})
            .then(async(orderpool)=>{
                console.log("Order pool address is " + orderpool); 
                await pool.newOrder(security, inrcashtokenaddress, ethers.utils.parseUnits('120',3),
                                ethers.utils.parseUnits('0',3), ethers.utils.parseUnits('500',3),
                                ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Sell"), {from: user})
                .then(async(orderRef)=>{
                    console.log("Order reference no is " + orderRef); 
                    /*await pool.editOrder(orderRef, ethers.utils.parseUnits('110',3),
                                    ethers.utils.parseUnits('0',3), ethers.utils.parseUnits('800',3),
                                    ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Sell"), {from: user})
                    .then(async(editStatus)=>{
                        console.log("Order has been changed " + editStatus); 
                        await pool.cancelOrder(orderRef, {from: user})
                        .then(function(cancelStatus){
                            console.log("Order has been cancelled " + cancelStatus); 
                        });
                    });*/
                });
            });
        });
    });
    /*
    it("Order matching for Trade", async()=>{
        const seller = accounts[1];
        const buyer = accounts[3];
        const manager = accounts[0];
        const dp = accounts[2];
        
        var registry = await SecuritiesRegistry.deployed();
        var factory = await PoolFactory.deployed();
        var pool = await OrderPool.deployed();
        var trade = await Trade.deployed();

        var inrcashtokenaddress = '';

        await registry.getToken(ethers.utils.formatBytes32String("VXINR"), ethers.utils.formatBytes32String("Jio"),
                                ethers.utils.formatBytes32String("INISIN0000"), {from: seller})
        .then(async(security)=>{
            console.log("Tokenized security address is " + security);         
            await factory.getPool(security, inrcashtokenaddress, {from: seller})
            .then(async(orderpool)=>{
                console.log("Order pool address is " + orderpool); 
                await pool.newOrder(security, inrcashtokenaddress, ethers.utils.parseUnits('120',3),
                                ethers.utils.parseUnits('0',3), ethers.utils.parseUnits('500',3),
                                ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Sell"), {from: seller})
                .then(async(sellRef)=>{
                    console.log("Sell Order reference no is " + sellRef); 
                    await pool.newOrder(security, inrcashtokenaddress, ethers.utils.parseUnits('120',3),
                                    ethers.utils.parseUnits('0',3), ethers.utils.parseUnits('500',3),
                                    ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Buy"), {from: buyer})
                    .then(async(buyRef)=>{
                        console.log("Buy Order reference no is " + buyRef); 
                        await trade.getOrders(ethers.utils.formatBytes32String("true"), {from: buyer})
                        .then(async(orders)=>{
                            const[ref, ...rest]=orders;
                            console.log("Checking the first order " + ref); 
                            await trade.getOrder(ref, {from: buyer})
                            .then(function(order){
                                const{a, b} = order;
                                console.log("Order details fetched ");
                            });
                            await trade.getTrade(ref, {from: buyer})
                            .then(function(bidask){
                                const{bid, ask} = bidask;
                                console.log("Trade details fetched, bid : " + bid + " ask : " + ask);
                            });
                        });
                    });
                });
            });
        });
    });

    it("Settling trades", async()=>{
        const seller = accounts[1];
        const buyer = accounts[3];
        const manager = accounts[0];
        const dp = accounts[2];

        var posttrade = await PostTrade.deployed();

        await posttrade.getSettlementRequests(ethers.utils.formatBytes32String("IN"), dpid, {from: dp})
        .then(async(posttradedata)=>{
            if(isResult(posttradedata)){
                const[ref, ...rest]=posttradedata;
                console.log("Going to use post trade reference no " + ref);
                await posttrade.getSettlementRequest(ref, {from: dp})
                .then(async(settlement)=>{
                    await posttrade.setSettlementStatus(ref, ethers.utils.formatBytes32String("IN"), ethers.utils.formatBytes32String("true"), {from: dp})
                    .then(function(){
                        console.log("Set settlement request status.");
                    })
                });
            }
        });
    });
    */
});