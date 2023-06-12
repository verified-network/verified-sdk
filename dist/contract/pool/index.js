"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Vault_json_1 = require("../../abi/assetmanager/Vault.json");
const contractAddress_1 = __importDefault(require("../../contractAddress"));
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["BATCHSWAP"] = "batchSwap";
    FUNCTIONS["SINGLESWAP"] = "swap";
    FUNCTIONS["GETPOOLTOKENS"] = "getPoolTokens";
})(FUNCTIONS || (FUNCTIONS = {}));
class PoolContract extends index_1.VerifiedContract {
    constructor(signer) {
        const address = contractAddress_1.default['balancerVault'];
        super(address, JSON.stringify(Vault_json_1.abi), signer);
        this.contractAddress = address;
    }
    //API below for single and batch swaps, and price and volume data from verified subgraphs for pool
    /**
    * API to perform Balancer Batch swap
    * @params (string _poolId,)
    * @returns {address[] memory}
    */
    async batchSwap(_poolId, _swapType, _limitAmount, _currencyAddress, _securityAddress, _amount, _account, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _poolId);
        await this.validateInput(index_1.DATATYPES.STRING, _swapType);
        await this.validateInput(index_1.DATATYPES.NUMBER, _limitAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _account);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _currencyAddress);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _securityAddress);
        const poolTokens = (await this.fetchPoolTokens(_poolId)).response.result[0];
        let _assetInIndex, _assetOutIndex;
        const vptAddress = poolTokens.find(address => address.toLowerCase() !== _securityAddress.toLowerCase() &&
            address.toLowerCase() !== _currencyAddress.toLowerCase());
        if (_swapType === "Sell") {
            _assetInIndex = poolTokens.findIndex(address => address.toLowerCase() === _securityAddress.toLowerCase());
            if (_poolType === "PrimaryIssue")
                _assetOutIndex = poolTokens.findIndex(address => address.toLowerCase() === _currencyAddress.toLowerCase());
            else if (_poolType === "SecondaryIssue")
                _assetOutIndex = poolTokens.findIndex(address => address.toLowerCase() === vptAddress.toLowerCase());
        }
        else if (_swapType === "Buy") {
            _assetInIndex = poolTokens.findIndex(address => address.toLowerCase() === _currencyAddress.toLowerCase());
            if (_poolType === "PrimaryIssue")
                _assetOutIndex = poolTokens.findIndex(address => address.toLowerCase() === _securityAddress.toLowerCase());
            else if (_poolType === "SecondaryIssue")
                _assetOutIndex = poolTokens.findIndex(address => address.toLowerCase() === vptAddress.toLowerCase());
        }
        let limitArr = new Array(3).fill(0);
        limitArr[_assetInIndex] = _limitAmount;
        // Where are the tokens coming from/going to?
        const fund_struct = {
            "sender": _account,
            "recipient": _account,
            "fromInternalBalance": false,
            "toInternalBalance": false
        };
        // When should the transaction timeout?
        const deadline = "999999999999999999";
        const swap_step_struct = [{
                poolId: _poolId,
                assetInIndex: _assetInIndex,
                assetOutIndex: _assetOutIndex,
                amount: _amount,
                userData: '0x'
            }];
        const swapKind = _swapType === "Sell" ? 0 : 1;
        return this.callContract(FUNCTIONS.BATCHSWAP, swapKind, swap_step_struct, poolTokens, fund_struct, limitArr, deadline, options);
    }
    async singleSwap(_poolId, _swapType, _assetIn, _assetOut, _limitAmount, _amount, _account, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _poolId);
        await this.validateInput(index_1.DATATYPES.STRING, _swapType);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _assetIn);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _assetOut);
        await this.validateInput(index_1.DATATYPES.NUMBER, _limitAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _account);
        const swapKind = _swapType === "Sell" ? 0 : 1;
        // Where are the tokens coming from/going to?
        const fund_struct = {
            "sender": _account,
            "recipient": _account,
            "fromInternalBalance": false,
            "toInternalBalance": false
        };
        // When should the transaction timeout?
        const deadline = "999999999999999999";
        const swap_struct = {
            poolId: _poolId,
            kind: swapKind,
            assetIn: _assetIn,
            assetOut: _assetOut,
            amount: _amount,
            userData: '0x'
        };
        return this.callContract(FUNCTIONS.SINGLESWAP, swap_struct, fund_struct, _limitAmount, deadline, options);
    }
    async fetchPoolTokens(_poolId, options) {
        return this.callContract(FUNCTIONS.GETPOOLTOKENS, _poolId, options);
    }
}
exports.default = PoolContract;
