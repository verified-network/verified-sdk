"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Security_json_1 = require("../../abi/trades/Security.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETSETTLEMENTS"] = "getSettlements";
    FUNCTIONS["BALANCE"] = "balanceOf";
})(FUNCTIONS || (FUNCTIONS = {}));
class SecurityContract extends index_1.VerifiedContract {
    constructor(signer, tokenAddress) {
        const chainId = signer.provider._network.chainId.toString();
        const address = tokenAddress;
        super(address, JSON.stringify(Security_json_1.abi), signer);
        this.contractAddress = address;
    }
    async balanceOf(_wallet, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _wallet);
        return this.callContract(FUNCTIONS.BALANCE, this.sanitiseInput(index_1.DATATYPES.ADDRESS, _wallet), options);
    }
    /**
     * Fetches settlement registry for client account.
     * @param _client account address
     * @param options
     * @returns settlement registry struct registry{
                                            address transferee;
                                            address transferor;
                                            uint256 amount;
                                            uint256 transferDateTime;
                                        }
     */
    async getSettlements(_client, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _client);
        return this.callContract(FUNCTIONS.GETSETTLEMENTS, this.sanitiseInput(index_1.DATATYPES.ADDRESS, _client), options);
    }
}
exports.default = SecurityContract;
