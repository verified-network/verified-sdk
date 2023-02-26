"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Oracle_json_1 = require("../../abi/payments/Oracle.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["RESULTRECEIVED"] = "LogResult";
})(FUNCTIONS || (FUNCTIONS = {}));
class OracleContract extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        //const chainId: string = Object.keys(networks)
        //const address = networks[chainId].address
        super(address, JSON.stringify(Oracle_json_1.abi), signer);
        this.contractAddress = address;
    }
    /*
        Watches and notifies event (LogResult) that is emitted when the Verified oracle fetches prices.
    */
    notifyResult(callback) {
        this.getEvent(FUNCTIONS.RESULTRECEIVED, callback);
    }
}
exports.default = OracleContract;
