"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const VerifiedProducts_json_1 = require("../../../abi/assetmanager/VerifiedProducts.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["ISSUEPRODUCT"] = "issueProduct";
})(FUNCTIONS || (FUNCTIONS = {}));
class VerifiedProducts extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = VerifiedProducts_json_1.networks[chainId].address;
        super(address, JSON.stringify(VerifiedProducts_json_1.abi), signer);
        this.contractAddress = address;
    }
    async issueProduct(issue, ref, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, issue);
        await this.validateInput(index_1.DATATYPES.STRING, ref);
        return this.callContract(FUNCTIONS.ISSUEPRODUCT, issue, this.sanitiseInput(index_1.DATATYPES.BYTE32, ref), _hashedMessage, _v, _r, _s, options);
    }
}
exports.default = VerifiedProducts;
