"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const L1Security_json_1 = require("../../../abi/deposits/L1Security.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SETSIGNER"] = "setSigner";
})(FUNCTIONS || (FUNCTIONS = {}));
class VerifiedSecurity extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = L1Security_json_1.networks[chainId].address;
        super(address, JSON.stringify(L1Security_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    async setSigner(_signer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _signer);
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options);
    }
}
exports.default = VerifiedSecurity;
