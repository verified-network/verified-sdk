"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Client_json_1 = require("../../abi/accounts/Client.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["INITIALIZE"] = "initialize";
    FUNCTIONS["SETCUSTODY"] = "setCustody";
    FUNCTIONS["GETCUSTODY"] = "getCustody";
    FUNCTIONS["SETACCESS"] = "setAccess";
    FUNCTIONS["GETACCESS"] = "getAccess";
    FUNCTIONS["SETMANAGER"] = "setManager";
    FUNCTIONS["GETMANAGER"] = "getManager";
    FUNCTIONS["ISREGISTERED"] = "isRegistered";
    FUNCTIONS["SETAMLSTATUS"] = "setAMLStatus";
    FUNCTIONS["GETAMLSTATUS"] = "getAMLStatus";
    FUNCTIONS["GETCLIENTS"] = "getClients";
    FUNCTIONS["GETROLE"] = "getRole";
    FUNCTIONS["REMOVEROLE"] = "removeRole";
    FUNCTIONS["ADDROLE"] = "addRole";
    FUNCTIONS["GETMANAGERS"] = "getManagers";
    FUNCTIONS["MANAGERADDED"] = "ManagerAdded";
})(FUNCTIONS || (FUNCTIONS = {}));
class ClientContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = Client_json_1.networks[chainId].address;
        super(address, JSON.stringify(Client_json_1.abi), signer);
        this.contractAddress = address;
    }
    initialize(_address) {
        return this.callContract(FUNCTIONS.INITIALIZE, params);
    }
    async setCustody(address, custody, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, address);
        return this.callContract(FUNCTIONS.SETCUSTODY, address, this.sanitiseInput(index_1.DATATYPES.BYTE32, custody), options);
    }
    async getCustody(address, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, address);
        return this.callContract(FUNCTIONS.GETCUSTODY, address, options);
    }
    /**
     * We can implement registration and log in using a SSO scheme such as Firebase (https://firebase.google.com/docs/auth) or Azure.
     * We host our infra on Azure, so that might be preferable. This will enable google / facebook / twitter / Microsoft users to log in to our application.
     * The SSO system will provide us with a token. Once logged in, the Verified Dapp should call the following solidity function.
     * This should only be called after the user’s KYC is complete.
     * @params (bool login)
     * @returns
     */
    async setAccess(_token, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _token);
        return this.callContract(FUNCTIONS.SETACCESS, _token, options);
    }
    async getAccess(_clientAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETACCESS, _clientAddress, options);
    }
    /**
     * Once a user’s wallet is set up, the Dapp should register the user for KYC (know your customer) process
     *  with the issuer. By default, Verified itself is the issuer. In the future, we may have country specific
     *  issuers. This is done by calling the following solidity contract function
     * @params (address _client, address _manager)
     * @returns
     */
    async setManager(_clientAddress, _managerAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _managerAddress);
        return this.callContract(FUNCTIONS.SETMANAGER, _clientAddress, _managerAddress, options);
    }
    /**
     * Get manager [callable by both client and manager
     * @param _clientAddress
     * @returns address
     */
    async getManager(_clientAddress) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        return this.callContract(FUNCTIONS.GETMANAGER, _clientAddress);
    }
    async isRegistered(params) {
        return this.callContract(FUNCTIONS.ISREGISTERED, params);
    }
    /**
     * We are going to use Coinfirm’s anti-money laundering score (cscore in the json response) to decide whether to block a user or not.
     * Any cscore below 33 needs to be flagged to status equal to false in the following solidity function call.
     * @params (address _client, bool status)
     * @returns
     */
    async setAMLStatus(_clientAddress, _status, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _clientAddress);
        await this.validateInput(index_1.DATATYPES.BOOLEAN, _status);
        return this.callContract(FUNCTIONS.SETAMLSTATUS, _clientAddress, _status, options);
    }
    /**
    * Get KYC status [callable by client or its manager or KYCAML submanager
    * @params (address _client)
    * @returns bool
    */
    async getAMLStatus(_client) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _client);
        return this.callContract(FUNCTIONS.GETAMLSTATUS, _client);
    }
    /**
     * The following solidity function should be called passing the issuer’s address as parameter where,
     *  _status equal to false will fetch all investors whose KYC is not yet complete.
     * @params (address _manager,bool _status)
     * @returns {address[] memory}
     */
    async getClients(_managerAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _managerAddress);
        return this.callContract(FUNCTIONS.GETCLIENTS, _managerAddress, options);
    }
    /**
    * Get sub-managers for role [callable only by manager]
    * @params (address _submanager, bytes32 _country)
    * @returns {address[] memory}
    */
    async getRole(_submanager, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        return this.callContract(FUNCTIONS.GETROLE, _submanager, options);
    }
    /**
   * Remove sub-manager from role [callable only by manager]
   * @params (address _submanager, bytes32 _country, bytes32 _role)
   * @returns
   */
    async removeRole(_submanager, _country, _role, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        await this.validateInput(index_1.DATATYPES.STRING, _role);
        return this.callContract(FUNCTIONS.REMOVEROLE, _submanager, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), this.sanitiseInput(index_1.DATATYPES.BYTE32, _role), options);
    }
    /**
     * Create role for sub-manager [callable only by manager
     * @params (address _submanager, bytes32 _country, bytes32 _role)
     * @returns
     */
    async addRole(_submanager, _country, _role, _id, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        await this.validateInput(index_1.DATATYPES.STRING, _role);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        return this.callContract(FUNCTIONS.ADDROLE, _submanager, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), this.sanitiseInput(index_1.DATATYPES.BYTE32, _role), this.sanitiseInput(index_1.DATATYPES.BYTE32, _id), options);
    }
    async getManagers(_role, _country, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _role);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        return this.callContract(FUNCTIONS.GETMANAGERS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _role), this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), options);
    }
    notifyManagerAdded(callback) {
        this.getEvent(FUNCTIONS.MANAGERADDED, callback);
    }
}
exports.default = ClientContract;
