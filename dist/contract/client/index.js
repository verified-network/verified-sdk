"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Client_json_1 = require("../../abi/securities/Client.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SETSIGNER"] = "setSigner";
    FUNCTIONS["GETROLE"] = "getRole";
    FUNCTIONS["REMOVEROLE"] = "removeRole";
    FUNCTIONS["ADDROLE"] = "addRole";
    FUNCTIONS["UPDATEKYC"] = "KycUpdate";
    FUNCTIONS["GETCLIENTKYC"] = "getClientKYC";
    FUNCTIONS["SETAMLSCORE"] = "setAmlScore";
    FUNCTIONS["SETAMLPASSSCORE"] = "setAmlPassScore";
    FUNCTIONS["GETAMLSTATUS"] = "getAMLStatus";
    FUNCTIONS["SETCUSTODYACCOUNT"] = "setCustodyAccount";
    FUNCTIONS["GETCUSTODYACCOUNT"] = "getCustodyAccount";
})(FUNCTIONS || (FUNCTIONS = {}));
class Client extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        //const chainId: string = Object.keys(networks)
        //const address = networks[chainId].address
        super(address, JSON.stringify(Client_json_1.abi), signer);
        this.contractAddress = address;
    }
    setSigner(_address) {
        return this.callContract(FUNCTIONS.SETSIGNER, _address);
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
    async removeRole(_manager, _submanager, _country, _role, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _manager);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        await this.validateInput(index_1.DATATYPES.STRING, _role);
        return this.callContract(FUNCTIONS.REMOVEROLE, _manager, _submanager, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), this.sanitiseInput(index_1.DATATYPES.BYTE32, _role), _hashedMessage, _v, _r, _s, options);
    }
    /**
     * Create role for sub-manager [callable only by manager
     * @params (address _submanager, bytes32 _country, bytes32 _role)
     * @returns
     */
    async addRole(_manager, _submanager, _country, _role, _id, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _manager);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        await this.validateInput(index_1.DATATYPES.STRING, _country);
        await this.validateInput(index_1.DATATYPES.STRING, _role);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        return this.callContract(FUNCTIONS.ADDROLE, _manager, _submanager, this.sanitiseInput(index_1.DATATYPES.BYTE32, _country), this.sanitiseInput(index_1.DATATYPES.BYTE32, _role), this.sanitiseInput(index_1.DATATYPES.BYTE32, _id), _hashedMessage, _v, _r, _s, options);
    }
    async KycUpdate(client, name, surname, country, status, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, client);
        await this.validateInput(index_1.DATATYPES.STRING, name);
        await this.validateInput(index_1.DATATYPES.STRING, surname);
        await this.validateInput(index_1.DATATYPES.STRING, country);
        await this.validateInput(index_1.DATATYPES.NUMBER, status);
        return this.callContract(FUNCTIONS.UPDATEKYC, client, this.sanitiseInput(index_1.DATATYPES.BYTE32, name), this.sanitiseInput(index_1.DATATYPES.BYTE32, surname), this.sanitiseInput(index_1.DATATYPES.BYTE32, country), status, _hashedMessage, _v, _r, _s, options);
    }
    async getClientKYC(_client, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _client);
        return this.callContract(FUNCTIONS.GETCLIENTKYC, _client, options);
    }
    async setAmlScore(_client, _score, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _client);
        await this.validateInput(index_1.DATATYPES.NUMBER, _score);
        return this.callContract(FUNCTIONS.SETAMLSCORE, _client, _score, options);
    }
    async setAmlPassScore(_score, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _score);
        return this.callContract(FUNCTIONS.SETAMLPASSSCORE, _score, options);
    }
    async getAMLStatus(_client, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _client);
        return this.callContract(FUNCTIONS.GETAMLSTATUS, _client, options);
    }
    async setCustodyAccount(_submanager, _currency, _accountId, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.STRING, _accountId);
        return this.callContract(FUNCTIONS.SETCUSTODYACCOUNT, _submanager, _currency, _accountId, options);
    }
    async getCustodyAccount(_submanager, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _submanager);
        return this.callContract(FUNCTIONS.GETCUSTODYACCOUNT, _submanager, options);
    }
}
exports.default = Client;
