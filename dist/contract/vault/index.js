"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Vault_json_1 = require("../../abi/assetmanager/Vault.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["FUNCTIONNAME"] = "funcName";
})(FUNCTIONS || (FUNCTIONS = {}));
class VaultContract extends index_1.VerifiedContract {
    constructor(signer, poolAddress) {
        const address = poolAddress;
        super(address, JSON.stringify(Vault_json_1.abi), signer);
        this.contractAddress = address;
    }
}
exports.default = VaultContract;
