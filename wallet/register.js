// (c) Kallol Borah, 2021
// Registers and processes KYC of users

const wallet = require('../index');

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();

const Client = require('../abi/accounts/Client.json');
const Kyc = require('../abi/accounts/Kyc.json');

const ClientAddress = process.env.CLIENT;
const KYCAddress = process.env.KYC;

module.exports = {
    // sets kyc for _client with _status
    setKycStatus : async function(_client, _status){
        const KYC = new ethers.Contract(KYCAddress, vkyc, provider);
        client = $("#_client").val();
        status = $("#_status").val();
        await KYC.setStatus(ethers.utils.getAddress(client), ethers.utils.formatBytes32String(status));
    },

    // gets kyc for _client in callback
    getKycStatus : async function(callback, _client){
        const KYC = new ethers.Contract(KYCAddress, vkyc, provider);
        client = $("#_client").val();
        callback(await KYC.getStatus(ethers.utils.getAddress(client)));
    },

    // updates kyc record for _client
    updateKycRecord : async function(_client, _file, _address, _photoId, _videoId, _fatca, _crs){
        const KYC = new ethers.Contract(KYCAddress, vkyc, provider);
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
    },

    // sets _custodian for _client
    setCustodian : async function(_client, _custodian){
        const Client = new ethers.Contract(ClientAddress, vclient, provider);
        client = $("#_client").val();
        custodian = $("#_custodian").val();
        await Client.setCustody(ethers.utils.getAddress(client), ethers.utils.getAddress(custodian));
    },

    // gets custodian for _client in callback
    getCustodian : async function(callback, _client){
        const Client = new ethers.Contract(ClientAddress, vclient, provider);
        client = $("#_client").val();
        callback(await Client.getCustody(ethers.utils.getAddress(client)));
    },

    // records _login for client
    setAccess : async function(_login){
        const Client = new ethers.Contract(ClientAddress, vclient, provider);
        login = $("#_login").val();
        await Client.setAccess(ethers.utils.formatBytes32String(login));
    },

    // gets login records for _client in callback
    getAccess : async function(callback, _client){
        const Client = new ethers.Contract(ClientAddress, vclient, provider);
        client = $("#_client").val();
        callback(await Client.getAccess(ethers.utils.getAddress(client)));
    },

    // sets manager in _address by _requestor
    setManager : async function(_address, _requestor){
        const Client = new ethers.Contract(ClientAddress, vclient, provider);
        address = $("#_address").val();
        requestor = $("#_requestor").val();
        if(requestor=="manager")
            await Client.setManager(ethers.utils.getAddress(address), wallet.address);
        else if(requestor=="client")
            await Client.setManager(wallet.address, ethers.utils.getAddress(address));
    },

    // gets manager for _client in callback to _requestor
    getManager : async function(callback, _client){
        const Client = new ethers.Contract(ClientAddress, vclient, provider);
        client = $("#_client").val();
        requestor = $("#_requestor").val();
        callback(await Client.getManager(ethers.utils.getAddress(client)));
    }
}


