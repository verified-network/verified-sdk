"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const PoolFactory_json_1 = require("../../abi/trades/PoolFactory.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETPOOL"] = "getPool";
})(FUNCTIONS || (FUNCTIONS = {}));
class PoolFactoryContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(PoolFactory_json_1.networks);
        const address = PoolFactory_json_1.networks[chainId].address;
        super(address, JSON.stringify(PoolFactory_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Get pool [callable by user on PoolFactory.sol]
     * @param (address _security, address _cash)
     * @returns (address)
     */
    async getPool(_security, _cash, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _cash);
        return this.callContract(FUNCTIONS.GETPOOL, _security, _cash, options);
    }
}
exports.default = PoolFactoryContract;
