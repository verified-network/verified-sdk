"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../index");
const Vault_json_1 = require("../../abi/assetmanager/Vault.json");
const contractAddress_1 = tslib_1.__importDefault(require("../../contractAddress"));
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SWAP"] = "swap";
    FUNCTIONS["BATCHSWAP"] = "batchSwap";
    FUNCTIONS["GETPOOLTOKENS"] = "getPoolTokens";
})(FUNCTIONS || (FUNCTIONS = {}));
class PoolContract extends index_1.VerifiedContract {
    constructor(signer) {
        const address = contractAddress_1.default['balancerVault'];
        super(address, JSON.stringify(Vault_json_1.abi), signer);
        this.contractAddress = address;
    }
    async swap(_swap, _funds, _limit, _deadline, options) {
        const { poolId, kind, assetIn, assetOut, amount, userData } = _swap;
        const { sender, fromInternalBalance, recipient, toInternalBalance } = _funds;
        await this.validateInput(index_1.DATATYPES.NUMBER, kind);
        await this.validateInput(index_1.DATATYPES.ADDRESS, assetIn);
        await this.validateInput(index_1.DATATYPES.ADDRESS, assetOut);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, sender);
        await this.validateInput(index_1.DATATYPES.ADDRESS, recipient);
        await this.validateInput(index_1.DATATYPES.NUMBER, _limit);
        await this.validateInput(index_1.DATATYPES.NUMBER, _deadline);
        return this.callContract(FUNCTIONS.SWAP, _swap, _funds, _limit, _deadline, options);
    }
    async batchSwap(_kind, _swaps, _assests, _funds, _limits, _deadline, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _kind);
        _swaps.map(async (swp) => {
            const { poolId, assetInIndex, assetOutIndex, amount, userData } = swp;
            await this.validateInput(index_1.DATATYPES.NUMBER, assetInIndex);
            await this.validateInput(index_1.DATATYPES.NUMBER, assetOutIndex);
            await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        });
        _assests.map(async (asst) => {
            await this.validateInput(index_1.DATATYPES.ADDRESS, asst);
        });
        const { sender, fromInternalBalance, recipient, toInternalBalance } = _funds;
        await this.validateInput(index_1.DATATYPES.ADDRESS, sender);
        await this.validateInput(index_1.DATATYPES.ADDRESS, recipient);
        _limits.map(async (lmt) => {
            await this.validateInput(index_1.DATATYPES.NUMBER, lmt);
        });
        await this.validateInput(index_1.DATATYPES.NUMBER, _deadline);
        return this.callContract(FUNCTIONS.BATCHSWAP, _kind, _swaps, _assests, _funds, _limits, _deadline, options);
    }
    async getPoolTokens(_poolId, options) {
        return this.callContract(FUNCTIONS.GETPOOLTOKENS, _poolId, options);
    }
}
exports.default = PoolContract;
