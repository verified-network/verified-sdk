// (c) Kallol Borah, 2020
// Test cases for Verified Accounts

var assert = require('assert');
const {ethers} = require ("ethers");
require('dotenv').config();

let abi = [
    "function setManager(address value, address value)",
    "function getManager(address value)",
    "function setStatus(address value, bool value)",
    "function getStatus(address value)",
    "function setFile(address value, bytes32 value)",
    "function getFile(address value)",
    "function setFATCA(address value, bytes32 value)",
    "function getFATCA(address value)",
    "function setCRS(address value, bytes32 value)",
    "function getCRS(address value)",
    "function setPhotoID(address value, bytes32 value)",
    "function getPhotoID(address value)",
    "function setVideoID(address value, bytes32 value)",
    "function getVideoID(address value)",
    "function setAddress(address value, bytes32 value)",
    "function getAddress(address value)",
    "function setCustody(address value, address value)",
    "function getCustody(address value)",
    "function setAccess(bool value)",
    "function getAccess(address value)",
    "function addRole(address value, bytes32 value, bytes32 value)",
    "function getRole(address value, bytes32 value)",
    "function removeRole(address value, bytes32 value, bytes32 value)",
    "function setAMLStatus(address value, bool value)",
    "function getAMLStatus(address value)",
    "function getClients(address value, bool value)"
];

const ClientAddress = '0xD9e1720d2303476175A28F7b1F1aff7C726DeA55';
const KYCAddress = '0x6AB3F95647474b0784E39670BD20FcC370903bC1';

const network = "rinkeby";
const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA_API_KEY);

const user = new ethers.Wallet(process.env.USER, provider);
const manager = new ethers.Wallet(process.env.MANAGER, provider);
const admin = new ethers.Wallet(process.env.DEPLOYER, provider);

var KYCedClient = new ethers.Contract(ClientAddress, abi, admin);
var ClientKYC = new ethers.Contract(KYCAddress, abi, user);

beforeEach(async()=>{
    console.log("before each");
    await KYCedClient.setManager(user, admin)
    .then(async()=>{
        await KYCedClient.getManager(user)
        .then(function(result){
            console.log("Set and Get manager address " + result);
        });
    });
});

describe("Client and KYC testing", async()=> {
    it("resets the manager", async()=>{
        console.log("Testing");
    });
    /* 
    it("resets the manager", async()=>{
        await KYCedClient.setManager(ethers.utils.getAddress(user), ethers.utils.getAddress(manager))
        .then(async()=>{
            await KYCedClient.getManager(ethers.utils.getAddress(user))
            .then(function(result){
                console.log("Reset manager address " + result);
            });
        });
    });
    
    it("sets and gets KYC status for client", async()=>{
        await ClientKYC.getStatus(user)
        .then(async()=>{
            await ClientKYC.setStatus(user, ethers.utils.formatBytes32String("true"))
            .then(async()=>{
                console.log("Set KYC status for client as " + "true");
                await ClientKYC.getStatus(user)
                .then(function(KycStatus){
                    console.log("Got KYC status for client as " + KycStatus);
                });
            });
        });
    });

    it("logs in client", async()=>{
        await ClientKYC.setStatus(user, ethers.utils.formatBytes32String("true"))
        .then(async()=>{
            await ClientKYC.getStatus(user)
            .then(async(KycStatus)=>{
                await KYCedClient.setAccess(ethers.utils.formatBytes32String("true"))
                .then(function(res){
                    console.log("Logged in client as " + "true");
                });
            });
        });
    });

    it("sets and gets KYC records", async()=>{
        await ClientKYC.setFile(user, ethers.utils.formatBytes32String("sample file"))
        .then(async(result)=>{
            await ClientKYC.getFile(user)
            .then(function(res){
                console.log("Set and Got file " + res);
            });
        });
        await ClientKYC.setAddress(user, ethers.utils.formatBytes32String("sample address"))
        .then(async(result)=>{
            await ClientKYC.getAddress(user)
            .then(function(res){
                console.log("Set and Got address " + res);
            });
        });
        await ClientKYC.setPhotoID(user, ethers.utils.formatBytes32String("sample photo"))
        .then(async(result)=>{
            await ClientKYC.getPhotoID(user)
            .then(function(res){
                console.log("Set and Got photo ID " + res);
            });
        });
        await ClientKYC.setVideoID(user, ethers.utils.formatBytes32String("sample video"))
        .then(async(result)=>{
            await ClientKYC.getVideoID(user)
            .then(function(res){
                console.log("Set and Got video ID " + res);
            });
        });
        await ClientKYC.setFATCA(user, ethers.utils.formatBytes32String("sample fatca file"))
        .then(async(result)=>{
            await ClientKYC.getFATCA(user)
            .then(function(res){
                console.log("Set and Got FATCA file " + res);
            });
        });
        await ClientKYC.setCRS(user, ethers.utils.formatBytes32String("sample crs file"))
        .then(async(result)=>{
            await ClientKYC.getCRS(user)
            .then(function(res){
                console.log("Set and Got CRS file " + res);
            });
        });
    });

    it("sets and gets custodian for client", async()=>{
        await ClientKYC.setStatus(user, ethers.utils.formatBytes32String("true"))
        .then(async()=>{
            await ClientKYC.getStatus(user)
            .then(async(KycStatus)=>{
                await KYCedClient.setCustody(user, admin)
                .then(async()=>{
                    console.log("Set custodian whose address is " + admin);
                    await KYCedClient.getCustody(user)
                    .then(function(result){
                        console.log("Got custodian address " + result);
                    });
                });
            });
        });
    });

    it("resets manager for client by manager after client KYC is done", async()=>{
        await ClientKYC.setStatus(user, ethers.utils.formatBytes32String("true"))
        .then(async()=>{
            await ClientKYC.getStatus(user)
            .then(async(KycStatus)=>{
                await KYCedClient.setManager(user, admin, {from: manager})
                .then(async()=>{
                    console.log("Set manager whose address is " + admin);
                    await KYCedClient.getManager(user)
                    .then(function(result){
                        console.log("New manager address " + result);
                    });
                });
            });
        });
    });

    it("sets and get sub manager roles", async()=>{
        await KYCedClient.getRole(manager, ethers.utils.formatBytes32String("India"))
        .then(async(result)=>{
            console.log("Got role " + result);
            await KYCedClient.addRole(manager, ethers.utils.formatBytes32String("India"), ethers.utils.formatBytes32String("KYCAML"))
            .then(async()=>{
                console.log("Added sub manager " + manager);
                await KYCedClient.getRole(manager, ethers.utils.formatBytes32String("India"))
                .then(async(result)=>{
                    console.log("Got role " + result);
                    await KYCedClient.removeRole(manager, ethers.utils.formatBytes32String("India"), ethers.utils.formatBytes32String("KYCAML"))
                    .then(async()=>{
                        console.log("Removed sub manager " + manager);
                        await KYCedClient.getRole(manager, ethers.utils.formatBytes32String("India"))
                        .then(async(result)=>{
                            console.log("Got role " + result);
                        });
                    });
                });
            });
        });
    });
    */ 
});