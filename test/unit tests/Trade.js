// Kallol Borah, 2021
// Test cases for Pre-trade, Trade and Post-trade transactions

const {ethers, Contract} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();

const PreTrade = artifacts.require('PreTrade');
const SecuritiesRegistry = artifacts.require('SecuritiesRegistry');
const Security = artifacts.require('Security');
const PoolFactory = artifacts.require('PoolFactory');
const OrderPool = artifacts.require('OrderPool');
const Trade = artifacts.require('Trade');
const PostTrade = artifacts.require('PostTrade');
const Client = artifacts.require('VerifiedClient');
const KYC = artifacts.require('VerifiedKYC');
const Cash = artifacts.require('ViaCash');
const Oracle = artifacts.require('Oracle');

contract("Trade contracts", async(accounts)=> {

    const dpid = "XYZ1234";
    var viausdCashAddress = '0x3E972bc8610e9BEc09711D3C8C5056703960422D';
    var oracleAddress = '0x5b893d68f8556D37caAb00D62d8fC7986514C9EF';

    var getFirstEvent = (_event) => {
        return new Promise((resolve, reject) => {
          _event.once('data', resolve).once('error', reject)
        });
    }

    it("Sets manager and KYC status for client", async()=>{
        var KYCedClient = await Client.at('0x15A182F894547a0e5a260cbdC7d298142D2b7c65');
        var ClientKYC = await KYC.at('0xfF0bb0874ef29AE71A88DE36f780790d4b2d9E12');

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
                        await KYCedClient.addRole(accounts[2], ethers.utils.formatBytes32String("US"), ethers.utils.formatBytes32String("DP"), {from:accounts[0]})
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
        await Pretrade.registerDematAccount(ethers.utils.formatBytes32String("VXUSD"), {from: user})
        .then(async()=>{
            await Pretrade.getRegistrationRequests(ethers.utils.formatBytes32String("US"), {from: dp})
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
        await Pretrade.registerSecurities(ethers.utils.formatBytes32String("VXUSD"), 
                                            ethers.utils.formatBytes32String("Free"),
                                            ethers.utils.formatBytes32String("INISIN0000"),
                                            ethers.utils.formatBytes32String("Jio"),
                                            ethers.utils.formatBytes32String("Equity"),
                                            ethers.utils.parseUnits('1000',0),
                                            ethers.utils.parseUnits('100',0),
                                            ethers.utils.formatBytes32String(""),
                                            ethers.utils.parseUnits('0',0),
                                            {from: user})
        .then(async()=>{
            await Pretrade.getConfirmationRequests(ethers.utils.formatBytes32String("US"), {from: dp})
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

        await registry.getToken(ethers.utils.formatBytes32String("VXUSD"), ethers.utils.formatBytes32String("Jio"),
                                ethers.utils.formatBytes32String("INISIN0000"), {from: user})
        .then(async(security)=>{
            console.log("Tokenized security address is " + security);         
            await factory.getPool(security, ethers.utils.getAddress(viausdCashAddress), {from: user})
            .then(async(orderpool)=>{
                console.log("Order pool address is " + orderpool); 
                var pool = await OrderPool.at(orderpool);
                await pool.newOrder(security, viausdCashAddress, ethers.utils.parseUnits('120',0),
                                ethers.utils.parseUnits('0',0), ethers.utils.parseUnits('500',0),
                                ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Sell"), {from: user})
                .then(async()=>{
                    await pool.getOrderRef({from: user})
                    .then(async(orderRef)=>{
                        console.log("Order reference no is " + orderRef); 
                        await pool.editOrder(orderRef, ethers.utils.parseUnits('110',0),
                                        ethers.utils.parseUnits('0',0), ethers.utils.parseUnits('80',0),
                                        ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Sell"), {from: user})
                        .then(async()=>{
                            console.log("Order has been changed."); 
                            await pool.cancelOrder(orderRef, {from: user})
                            .then(function(){
                                console.log("Order has been cancelled."); 
                            });
                        });
                    });
                });
            });
        });
    });
    
    it("Order matching for Trade", async()=>{
        const seller = accounts[1];
        const buyer = accounts[3];
        const manager = accounts[0];
        const dp = accounts[2];

        console.log("Seller address is " + accounts[1]);
        console.log("Buyer address is " + accounts[3]);
        console.log("Manager address is " + accounts[0]);
        console.log("DP address is " + accounts[2]);
        
        var registry = await SecuritiesRegistry.deployed();
        var factory = await PoolFactory.deployed();
        var trade = await Trade.deployed();
        
        var viausdCash = await Cash.at(viausdCashAddress);
        var oracle = await Oracle.at(oracleAddress); 
        await viausdCash.sendTransaction({buyer, to:viausdCashAddress, value:1e18});
        await getFirstEvent(oracle.LogResult({fromBlock:'latest'}));

        await registry.getToken(ethers.utils.formatBytes32String("VXUSD"), ethers.utils.formatBytes32String("Jio"),
                                ethers.utils.formatBytes32String("INISIN0000"), {from: seller})
        .then(async(security)=>{
            console.log("Tokenized security address is " + security);         
            await factory.getPool(security, viausdCashAddress, {from: seller})
            .then(async(orderpool)=>{
                console.log("Order pool address is " + orderpool); 
                var pool = await OrderPool.at(orderpool);
                await pool.newOrder(security, viausdCashAddress, ethers.utils.parseUnits('120',0),
                                ethers.utils.parseUnits('0',0), ethers.utils.parseUnits('500',0),
                                ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Sell"), {from: seller})
                .then(async()=>{
                    await pool.getOrderRef({from: seller})
                    .then(async(sellRef)=>{
                        console.log("Sell Order reference no is " + sellRef); 
                        await pool.newOrder(security, viausdCashAddress, ethers.utils.parseUnits('120',0),
                                        ethers.utils.parseUnits('0',0), ethers.utils.parseUnits('50',0),
                                        ethers.utils.formatBytes32String("Market"), ethers.utils.formatBytes32String("Buy"), {from: buyer})
                        .then(async()=>{
                            await pool.getOrderRef({from: buyer})
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
                                        const {bid, ask} = bidask;
                                        console.log("Trade details fetched, bid : " + bid + " ask : " + ask);
                                    });
                                });
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
        var security = await Security.deployed();

        await posttrade.getSettlementRequests(ethers.utils.formatBytes32String("US"), ethers.utils.formatBytes32String(dpid), {from: dp})
        .then(async(posttradedata)=>{
            const[ref, ...rest]=posttradedata;
            console.log("Going to use post trade reference no " + ref);
            await posttrade.getSettlementRequest(ref, {from: dp})
            .then(async(settlement)=>{
                console.log("Settlement consideration " + settlement);  
                await security.balanceOf(seller)   
                .then(async(sellerbalance)=>{
                    console.log("Seller balance before settling trade " + sellerbalance);
                    await security.balanceOf(buyer)   
                    .then(async(buyerbalance)=>{
                        console.log("Buyer balance before settling trade " + buyerbalance);      
                        await posttrade.setSettlementStatus(ref, ethers.utils.formatBytes32String("US"), ethers.utils.formatBytes32String("Confirm"), {from: dp})
                        .then(async()=>{
                            console.log("Settled trade.");
                            await security.balanceOf(seller)   
                            .then(async(postsellerbalance)=>{
                                console.log("Seller balance after settling trade " + postsellerbalance);
                                await security.balanceOf(buyer)   
                                .then(async(postbuyerbalance)=>{
                                    console.log("Buyer balance after settling trade " + postbuyerbalance);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
});