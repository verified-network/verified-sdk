// (c) Kallol Borah, 2021
// Registers and processes KYC of users

const {ethers, Signer} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();

const vclient = artifacts.require('VerifiedClient');
const vkyc = artifacts.require('VerifiedKYC');
const ClientAddress = process.env.CLIENT;
const KYCAddress = process.env.KYC;

async function setKycStatus(client, status){
    const KYC = new ethers.Contract(KYCAddress, vkyc, signer);
    await KYC.setStatus(client, status);
}

async function getKycStatus(callback, client){
    const KYC = new ethers.Contract(KYCAddress, vkyc, provider);
    callback(await KYC.getStatus(client));
}

async function updateKycRecord(client, file, address, photoId, videoId, fatca, crs){
    const KYC = new ethers.Contract(KYCAddress, vkyc, signer);
    await KYC.setFile(client, file);
    await KYC.setAddress(client, address);
    await KYC.setPhotoID(client, photoId);
    await KYC.setVideoID(client, videoId);
    await KYC.setFATCA(client, fatca);
    await KYC.setCRS(client, crs);
}

async function setCustodian(client, custodian){
    const Client = new ethers.Contract(ClientAddress, vclient, signer);
    await Client.setCustody(client, custodian);
}

async function getCustodian(callback, client){
    const Client = new ethers.Contract(ClientAddress, vclient, provider);
    callback(await Client.getCustody(client));
}

async function setAccess(login){
    const Client = new ethers.Contract(ClientAddress, vclient, signer);
    await Client.setAccess(login);
}

async function getAccess(callback, client){
    const Client = new ethers.Contract(ClientAddress, vclient, provider);
    callback(await Client.getAccess(client));
}

async function setManager(client, manager){
    const Client = new ethers.Contract(ClientAddress, vclient, signer);
    await Client.setManager(client, manager);
}

async function getManager(callback, client, requestor){
    const Client = new ethers.Contract(ClientAddress, vclient, provider);
    callback(await Client.getManager(client, requestor));
}

// create wallet
function register(callback){
    const wallet = ethers.Wallet.createRandom();
    callback(wallet.mnemonic);
}

// create wallet from stored mnemomic
function createWallet(seed){
    const wallet = ethers.Wallet.createWallet(seed);
}