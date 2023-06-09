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
    async batchSwap(_poolId, _swapType, _poolType, _assetInIndex, _assetOutIndex, _limitAmount, _currencyAddress, _securityAddress, _vptAddress, _amount, _account, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _poolId);
        await this.validateInput(index_1.DATATYPES.STRING, _swapType);
        await this.validateInput(index_1.DATATYPES.STRING, _poolType);
        await this.validateInput(index_1.DATATYPES.NUMBER, _assetInIndex);
        await this.validateInput(index_1.DATATYPES.NUMBER, _assetOutIndex);
        await this.validateInput(index_1.DATATYPES.NUMBER, _limitAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _account);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _currencyAddress);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _securityAddress);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _vptAddress);
        let tokensList = [undefined, undefined, undefined];
        if (_swapType === "Sell") {
            tokensList[_assetInIndex] = _securityAddress;
            if (_poolType === "PrimaryIssue")
                tokensList[_assetOutIndex] = _currencyAddress;
            else if (_poolType === "SecondaryIssue")
                tokensList[_assetOutIndex] = _vptAddress;
        }
        else if (_swapType === "Buy") {
            tokensList[_assetInIndex] = _currencyAddress;
            if (_poolType === "PrimaryIssue")
                tokensList[_assetOutIndex] = _securityAddress;
            else if (_poolType === "SecondaryIssue")
                tokensList[_assetOutIndex] = _vptAddress;
        }
        let remainingIndex = tokensList.findIndex(element => element === undefined);
        if (_poolType === "PrimaryIssue")
            tokensList[remainingIndex] = _vptAddress;
        else if (_poolType === "SecondaryIssue")
            tokensList[remainingIndex] = _currencyAddress;
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
        const deadline = BigNumber(999999999999999999);
        const swap_step_struct = [{
                poolId: _poolId,
                assetInIndex: _assetInIndex,
                assetOutIndex: _assetOutIndex,
                amount: _amount,
                userData: '0x'
            }];
        const swapKind = _swapType === "Sell" ? 0 : 1;
        return this.callContract(FUNCTIONS.BATCHSWAP, swapKind, swap_step_struct, tokensList, fund_struct, limitArr, deadline, options);
    }
    async singleSwap(_poolId, _swapType, _poolType, _assetIn, _assetOut, _limitAmount, _vptAddress, _amount, _account, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _poolId);
        await this.validateInput(index_1.DATATYPES.STRING, _swapType);
        await this.validateInput(index_1.DATATYPES.STRING, _poolType);
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
        const deadline = BigNumber(999999999999999999);
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
}
exports.default = PoolContract;
