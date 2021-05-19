// (c) Kallol Borah, 2020
// Test cases for Verified Accounts

const {ethers, Contract} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();

const ABDKMathQuad = artifacts.require('ABDKMathQuad');
const Client = artifacts.require('Client');
const Kyc = artifacts.require('Kyc');

contract("Client and KYC testing", async(accounts)=> {

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

    it("sets and gets KYC status for client", async()=>{
        var ClientKYC = await Kyc.deployed();
        await ClientKYC.getStatus(accounts[1])
        .then(async()=>{
            await ClientKYC.setStatus(accounts[1], ethers.utils.formatBytes32String("true"))
            .then(async()=>{
                console.log("Set KYC status for client as " + "true");
                await ClientKYC.getStatus(accounts[1])
                .then(function(KycStatus){
                    console.log("Got KYC status for client as " + KycStatus);
                });
            });
        });
    });

    it("logs in client", async()=>{
        var ClientKYC = await Kyc.deployed();
        var KYCedClient = await Client.deployed();

        await ClientKYC.setStatus(accounts[1], ethers.utils.formatBytes32String("true"))
        .then(async()=>{
            await ClientKYC.getStatus(accounts[1])
            .then(async(KycStatus)=>{
                await KYCedClient.setAccess(ethers.utils.formatBytes32String("true"))
                .then(function(res){
                    console.log("Logged in client as " + "true");
                });
            });
        });
    });

    it("sets and gets KYC records", async()=>{
        var ClientKYC = await Kyc.deployed();
        await ClientKYC.setFile(accounts[1], ethers.utils.formatBytes32String("sample file"))
        .then(async(result)=>{
            await ClientKYC.getFile(accounts[1])
            .then(function(res){
                console.log("Set and Got file " + res);
            });
        });
        await ClientKYC.setAddress(accounts[1], ethers.utils.formatBytes32String("sample address"))
        .then(async(result)=>{
            await ClientKYC.getAddress(accounts[1])
            .then(function(res){
                console.log("Set and Got address " + res);
            });
        });
        await ClientKYC.setPhotoID(accounts[1], ethers.utils.formatBytes32String("sample photo"))
        .then(async(result)=>{
            await ClientKYC.getPhotoID(accounts[1])
            .then(function(res){
                console.log("Set and Got photo ID " + res);
            });
        });
        await ClientKYC.setVideoID(accounts[1], ethers.utils.formatBytes32String("sample video"))
        .then(async(result)=>{
            await ClientKYC.getVideoID(accounts[1])
            .then(function(res){
                console.log("Set and Got video ID " + res);
            });
        });
        await ClientKYC.setFATCA(accounts[1], ethers.utils.formatBytes32String("sample fatca file"))
        .then(async(result)=>{
            await ClientKYC.getFATCA(accounts[1])
            .then(function(res){
                console.log("Set and Got FATCA file " + res);
            });
        });
        await ClientKYC.setCRS(accounts[1], ethers.utils.formatBytes32String("sample crs file"))
        .then(async(result)=>{
            await ClientKYC.getCRS(accounts[1])
            .then(function(res){
                console.log("Set and Got CRS file " + res);
            });
        });
    });

    it("sets and gets custodian for client", async()=>{
        var ClientKYC = await Kyc.deployed();
        var KYCedClient = await Client.deployed();
        await ClientKYC.setStatus(accounts[1], ethers.utils.formatBytes32String("true"))
        .then(async()=>{
            await ClientKYC.getStatus(accounts[1])
            .then(async(KycStatus)=>{
                await KYCedClient.setCustody(accounts[1], accounts[3])
                .then(async()=>{
                    console.log("Set custodian whose address is " + accounts[3]);
                    await KYCedClient.getCustody(accounts[1])
                    .then(function(result){
                        console.log("Got custodian address " + result);
                    });
                });
            });
        });
    });

    it("resets manager for client by manager after client KYC is done", async()=>{
        var ClientKYC = await Kyc.deployed();
        var KYCedClient = await Client.deployed();
        await ClientKYC.setStatus(accounts[1], ethers.utils.formatBytes32String("true"))
        .then(async()=>{
            await ClientKYC.getStatus(accounts[1])
            .then(async(KycStatus)=>{
                await KYCedClient.setManager(accounts[1], accounts[2])
                .then(async()=>{
                    console.log("Set manager whose address is " + accounts[2]);
                    await KYCedClient.getManager(accounts[1])
                    .then(function(result){
                        console.log("New manager address " + result);
                    });
                });
            });
        });
    });

});