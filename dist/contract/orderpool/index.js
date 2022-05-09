"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const OrderPool_json_1 = require("../../abi/trades/OrderPool.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["NEWORDER"] = "newOrder";
    FUNCTIONS["EDITORDER"] = "editOrder";
    FUNCTIONS["CANCELORDER"] = "cancelOrder";
    FUNCTIONS["GETORDERREF"] = "getOrderRef";
})(FUNCTIONS || (FUNCTIONS = {}));
class OrderPoolContract extends index_1.VerifiedContract {
    constructor(signer, orderPool) {
        const chainId = signer.provider._network.chainId.toString();
        const address = orderPool;
        super(address, JSON.stringify(OrderPool_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Get pool [callable by user on PoolFactory.sol]
     * @param (address _security, address _cash, uint256 _price, uint256 _trigger, uint256 _qty, bytes32 _orderType, bytes32 _order)
     * @returns (bytes32)
     */
    async newOrder(_security, _cash, _price, _qty, _orderType, _order, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _cash);
        await this.validateInput(index_1.DATATYPES.STRING, _price);
        await this.validateInput(index_1.DATATYPES.STRING, _qty);
        await this.validateInput(index_1.DATATYPES.STRING, _orderType);
        await this.validateInput(index_1.DATATYPES.STRING, _order);
        return this.callContract(FUNCTIONS.NEWORDER, _security, _cash, _price, _qty, this.sanitiseInput(index_1.DATATYPES.BYTE32, _orderType), this.sanitiseInput(index_1.DATATYPES.BYTE32, _order), options);
    }
    /**
     * Get pool [callable by user on PoolFactory.sol]
     * @param ( bytes32 _ref, uint256 _price, uint256 _trigger, uint256 _qty, bytes32 _orderType, bytes32 _order)
     * @returns (bool)
     */
    async editOrder(_ref, _price, _qty, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        await this.validateInput(index_1.DATATYPES.STRING, _price);
        await this.validateInput(index_1.DATATYPES.STRING, _qty);
        return this.callContract(FUNCTIONS.EDITORDER, _ref, _price, _qty, options);
    }
    /**
     * Get pool [callable by user on PoolFactory.sol]
     * @param (bytes32 ref)
     * @returns (bool)
     */
    async cancelOrder(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.CANCELORDER, _ref, options);
    }
    /**
     * Returns order reference for requestor
     * @param options
     * @returns
     */
    async getOrderRef(options) {
        return this.callContract(FUNCTIONS.GETORDERREF, options);
    }
}
exports.default = OrderPoolContract;
