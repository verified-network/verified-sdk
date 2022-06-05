"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Trade_json_1 = require("../../abi/trades/Trade.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETORDERS"] = "getOrders";
    FUNCTIONS["GETORDER"] = "getOrder";
    FUNCTIONS["GETTRADE"] = "getTrade";
})(FUNCTIONS || (FUNCTIONS = {}));
class TradeContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(Trade_json_1.networks);
        const address = Trade_json_1.networks[chainId].address;
        super(address, JSON.stringify(Trade_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Get no of orders [callable by user on Trade.sol]
     * @param ( bool originator)
     * @returns (bytes32[] memory) Returns array of order references.
     * Originator be set to ‘false’ if orders to fetch are not created by user,
     * and to ‘true’ if orders to fetch are created by user
     */
    async getOrders(originator, options) {
        await this.validateInput(index_1.DATATYPES.BOOLEAN, originator);
        return this.callContract(FUNCTIONS.GETORDERS, originator, options);
    }
    /**
   * View order [callable by user on Trade.sol]
   * @param (bytes32 ref)
   * @returns (struct order{
                address party;
                address security;
                uint256 price;
                uint256 trigger;
                bytes32 otype;
                bytes32 order;
                bytes32 status;
                bytes32 currency;
                bytes32 securityName;
                uint256 qty;
                uint256 dt;
            })
   */
    async getOrder(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETORDER, _ref, options);
    }
    /**
     * View trade [callable by user]
     * @param (bytes32 ref)
     * @returns (uint256, uint256)
     * Returns last bid price, ask price.
     */
    async getTrade(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETTRADE, _ref, options);
    }
}
exports.default = TradeContract;
