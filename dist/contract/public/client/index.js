"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Client_json_1 = require("../../../abi/assetmanager/Client.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SETSIGNER"] = "setSigner";
    FUNCTIONS["GETROLE"] = "getRole";
    FUNCTIONS["REMOVEROLE"] = "removeRole";
    FUNCTIONS["ADDROLE"] = "addRole";
})(FUNCTIONS || (FUNCTIONS = {}));
class VerifiedClient extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(Client_json_1.networks);
        const address = Client_json_1.networks[chainId].address;
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
}
exports.default = VerifiedClient;
