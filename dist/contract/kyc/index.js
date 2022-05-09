"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Kyc_json_1 = require("../../abi/accounts/Kyc.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETSTATUS"] = "getStatus";
    FUNCTIONS["SETSTATUS"] = "setStatus";
    FUNCTIONS["KYCUPDATE"] = "KycUpdate";
    FUNCTIONS["SETFILE"] = "setFile";
    FUNCTIONS["SETFATCA"] = "setFATCA";
    FUNCTIONS["SETCRS"] = "setCRS";
    FUNCTIONS["SETPHOTOID"] = "setPhotoID";
    FUNCTIONS["SETVIDEOID"] = "setVideoID";
    FUNCTIONS["SETADDRESS"] = "setAddress";
    FUNCTIONS["SETKYC"] = "setKyc";
    FUNCTIONS["GETFILE"] = "getFile";
    FUNCTIONS["GETFATCA"] = "getFATCA";
    FUNCTIONS["GETCRS"] = "getCRS";
    FUNCTIONS["GETPHOTOID"] = "getPhotoID";
    FUNCTIONS["GETVIDEOID"] = "getVideoID";
    FUNCTIONS["GETADDRESS"] = "getAddress";
    FUNCTIONS["GETKYC"] = "getKyc";
    FUNCTIONS["SETCOUNTRY"] = "setCountry";
    FUNCTIONS["GETCOUNTRY"] = "getCountry";
    FUNCTIONS["SETNAME"] = "setName";
    FUNCTIONS["GETNAME"] = "getName";
    FUNCTIONS["SETPHONE"] = "setPhone";
    FUNCTIONS["GETPHONE"] = "getPhone";
    FUNCTIONS["SETEMAIL"] = "setEmail";
    FUNCTIONS["GETEMAIL"] = "getEmail";
    FUNCTIONS["GETKYCPAID"] = "getKYCPaid";
    FUNCTIONS["SETKYCPAID"] = "setKYCPaid";
})(FUNCTIONS || (FUNCTIONS = {}));
class KYCContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = Kyc_json_1.networks[chainId].address;
        super(address, JSON.stringify(Kyc_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * An issuer can ‘accept’ or ‘reject’ KYC using the setKYC API.
     * @param (address _client, bool _status)
     * @returns
     */
    async setStatus(_clientAddress, _status, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.NUMBER, _status);
        return this.callContract(FUNCTIONS.SETSTATUS, _clientAddress, _status, options);
    }
    /**
     * The issuer as well as the investor can fetch the investor’s KYC status using the getKYC API.
     * @param (address _client)
     * @returns bool
     * Note : KYC status needs to be ‘true’ for the investor to carry out any further operations in the Dapp.
     */
    async getStatus(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETSTATUS, _clientAddress, options);
    }
    /**
     * If an issuer accepts or rejects the investor’s KYC, the transaction will trigger an event on the
     * blockchain that should be filtered using etherjs and displayed to the investor.
     * @param (address indexed client, bool status)
     * @returns bool
     * The investor facing Dapp should filter the event with the investor’s address mapped to ‘client’ in the event below.
     */
    kycUpdate(callback) {
        this.getEvent(FUNCTIONS.KYCUPDATE, callback);
    }
    /**
     * The investor can fill up its KYC using an API. This API call needs to be preceded by uploading the KYC documents
     * (eg, photo ID, video ID, etc) to IPFS and using the IPFS urls in the API. Instead of uploading to IPFS,
     * we may also plug in a third party KYC management system, so please check before implementing.
     * @param {address _client,bytes32 _file, bytes32 _fatca,bytes32 _crs, bytes32 _photoId,bytes32 _videoId, bytes32 _address}
     * @returns
     */
    async setKyc(_clientAddress, _file, _fatca, _crs, _photoId, _videoId, _address, _country, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        await this.validateInput(index_1.DATATYPES.STRING, _address);
        await this.validateInput(index_1.DATATYPES.STRING, _photoId);
        await this.validateInput(index_1.DATATYPES.STRING, _videoId);
        await this.validateInput(index_1.DATATYPES.STRING, _fatca);
        await this.validateInput(index_1.DATATYPES.STRING, _crs);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        return this.callContract(FUNCTIONS.SETKYC, _clientAddress, _file, _fatca, _crs, _photoId, _videoId, _address, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), options);
    }
    async setName(_clientAddress, _name, _surname, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _name);
        await this.validateInput(index_1.DATATYPES.STRING, _surname);
        return this.callContract(FUNCTIONS.SETNAME, _clientAddress, this.sanitiseInput(index_1.DATATYPES.BYTE32, _name), this.sanitiseInput(index_1.DATATYPES.BYTE32, _surname), options);
    }
    async setPhone(_clientAddress, _phone, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _phone);
        return this.callContract(FUNCTIONS.SETPHONE, _clientAddress, this.sanitiseInput(index_1.DATATYPES.BYTE32, _phone), options);
    }
    async setEmail(_clientAddress, _email, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _email);
        return this.callContract(FUNCTIONS.SETEMAIL, _clientAddress, this.sanitiseInput(index_1.DATATYPES.BYTE32, _email), options);
    }
    async setCountry(_clientAddress, _country, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        return this.callContract(FUNCTIONS.SETCOUNTRY, _clientAddress, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), options);
    }
    async setFile(_clientAddress, _file, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        return this.callContract(FUNCTIONS.SETFILE, _clientAddress, _file, options);
    }
    async setFATCA(_clientAddress, _file, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        return this.callContract(FUNCTIONS.SETFATCA, _clientAddress, _file, options);
    }
    async setCRS(_clientAddress, _file, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        return this.callContract(FUNCTIONS.SETCRS, _clientAddress, _file, options);
    }
    async setPhotoID(_clientAddress, _file, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        return this.callContract(FUNCTIONS.SETPHOTOID, _clientAddress, _file, options);
    }
    async setVideoID(_clientAddress, _file, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        return this.callContract(FUNCTIONS.SETVIDEOID, _clientAddress, _file, options);
    }
    async setAddress(_clientAddress, _file, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _file);
        return this.callContract(FUNCTIONS.SETADDRESS, _clientAddress, _file, options);
    }
    /**
      * Get KYC details [callable by client or its manager or KYCAML submanager
      * @param (address _client)
      * @returns (bytes32, bytes32, bytes32, bytes32, bytes32, bytes32)Returns KYC_file, fatca_declaration, crs_declaration, photo_id, video_id, address_proof
      */
    async getKyc(_client, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _client);
        return this.callContract(FUNCTIONS.GETKYC, _client, options);
    }
    async getFile(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETFILE, _clientAddress, options);
    }
    async getFATCA(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETFATCA, _clientAddress, options);
    }
    async getCRS(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETCRS, _clientAddress, options);
    }
    async getPhotoID(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETPHOTOID, _clientAddress, options);
    }
    async getVideoID(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETVIDEOID, _clientAddress, options);
    }
    async getAddress(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETADDRESS, _clientAddress, options);
    }
    async getCountry(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETCOUNTRY, _clientAddress, options);
    }
    async getName(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETNAME, _clientAddress, options);
    }
    async getPhone(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETPHONE, _clientAddress, options);
    }
    async getEmail(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETEMAIL, _clientAddress, options);
    }
    async setKYCPaid(_clientAddress, _paidStatus, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.STRING, _paidStatus);
        return this.callContract(FUNCTIONS.SETKYCPAID, _clientAddress, this.sanitiseInput(index_1.DATATYPES.BYTE32, _paidStatus), options);
    }
    async getKYCPaid(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETKYCPAID, _clientAddress, options);
    }
}
exports.default = KYCContract;
