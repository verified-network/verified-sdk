// (c) Kallol Borah, 2021
// Registers and processes KYC of users

const {ethers, Signer} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();
const wallet = new ethers.Wallet(signer.address, provider);

const vclient = artifacts.require('VerifiedClient');
const vkyc = artifacts.require('VerifiedKYC');
const ClientAddress = process.env.CLIENT;
const KYCAddress = process.env.KYC;

// sets kyc for _client with _status
export async function setKycStatus(_client, _status){
    const KYC = new ethers.Contract(KYCAddress, vkyc, signer);
    client = $("#_client").val();
    status = $("#_status").val();
    await KYC.setStatus(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(status));
}

// gets kyc for _client in callback
export async function getKycStatus(callback, _client){
    const KYC = new ethers.Contract(KYCAddress, vkyc, provider);
    client = $("#_client").val();
    callback(await KYC.getStatus(ethers.utils.getAddress(client)));
}

// updates kyc record for _client
export async function updateKycRecord(_client, _file, _address, _photoId, _videoId, _fatca, _crs){
    const KYC = new ethers.Contract(KYCAddress, vkyc, signer);
    client = $("#_client").val();
    file = $("#_file").val();
    address = $("#_address").val();
    photoId = $("#_photoId").val();
    videoId = $("#_videoId").val();
    fatca = $("#_fatca").val();
    crs = $("#_crs").val();
    await KYC.setFile(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(file));
    await KYC.setAddress(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(address));
    await KYC.setPhotoID(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(photoId));
    await KYC.setVideoID(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(videoId));
    await KYC.setFATCA(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(fatca));
    await KYC.setCRS(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(crs));
}

// sets _custodian for _client
export async function setCustodian(_client, _custodian){
    const Client = new ethers.Contract(ClientAddress, vclient, signer);
    client = $("#_client").val();
    custodian = $("#_custodian").val();
    await Client.setCustody(ethers.utils.getAddress(client), ethers.utils.getAddress(custodian));
}

// gets custodian for _client in callback
export async function getCustodian(callback, _client){
    const Client = new ethers.Contract(ClientAddress, vclient, provider);
    client = $("#_client").val();
    callback(await Client.getCustody(ethers.utils.getAddress(client)));
}

// records _login for client
export async function setAccess(_login){
    const Client = new ethers.Contract(ClientAddress, vclient, signer);
    login = $("#_login").val();
    await Client.setAccess(ethers.utils.formatBytes32String(login));
}

// gets login records for _client in callback
export async function getAccess(callback, _client){
    const Client = new ethers.Contract(ClientAddress, vclient, provider);
    client = $("#_client").val();
    callback(await Client.getAccess(ethers.utils.getAddress(client)));
}

// sets manager in _address by _requestor
export async function setManager(_address, _requestor){
    const Client = new ethers.Contract(ClientAddress, vclient, signer);
    address = $("#_address").val();
    requestor = $("#_requestor").val();
    if(requestor=="manager")
        await Client.setManager(ethers.utils.getAddress(address), signer.address);
    else if(requestor=="client")
        await Client.setManager(signer.address, ethers.utils.getAddress(address));
}

// gets manager for _client in callback to _requestor
export async function getManager(callback, _client, _requestor){
    const Client = new ethers.Contract(ClientAddress, vclient, provider);
    client = $("#_client").val();
    requestor = $("#_requestor").val();
    callback(await Client.getManager(ethers.utils.getAddress(client), ethers.utils.getAddress(requestor)));
}

// create wallet
export function register(callback){
    wallet = ethers.Wallet.createRandom();
    callback(wallet.mnemonic);
}

// create wallet from stored mnemomic
export function createWallet(seed){
    wallet = ethers.Wallet.createWallet(seed);
}

// returns address of verified account
export function getAccount(callback){
    callback(wallet.address);
}