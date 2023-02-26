"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Security_json_1 = require("../../../abi/securities/Security.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["APPROVETOKEN"] = "approveToken";
})(FUNCTIONS || (FUNCTIONS = {}));
class Security extends index_1.VerifiedContract {
    constructor(signer, tokenAddress) {
        const address = tokenAddress;
        super(address, JSON.stringify(Security_json_1.abi), signer);
        this.contractAddress = address;
    }
    async approveToken(_owner, _spender, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _owner);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.APPROVETOKEN, _owner, _spender, _amount, options);
    }
}
exports.default = Security;
