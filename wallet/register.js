// (c) Kallol Borah, 2021
// Registers and processes KYC of users

const {ethers} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();

const vclient = artifacts.require('VerifiedClient');
const vkyc = artifacts.require('VerifiedKYC');
const ClientAddress = process.env.CLIENT;
const KYCAddress = process.env.KYC;
const Client = new ethers.Contract(ClientAddress, vclient, signer);
const KYC = new ethers.Contract(KYCAddress, vkyc, signer);

function setKycStatus(status){

}

function getKycStatus(){

}

function updateKycRecord(){

}

function setCustodian(custodian){

}

function getCustodian(){

}

function setAccess(){

}

function getAccess(){

}

function setManager(manager){

}

function getManager(){

}

