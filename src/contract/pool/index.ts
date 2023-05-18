// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/assetmanager/Vault.json';
import { SwapType, Swaps } from "@balancer-labs/sdk";

enum FUNCTIONS {
    BATCHSWAP = 'batchswap'
}

export default class PoolContract extends VerifiedContract {

    public contractAddress: string
    public balancerVault: string

    constructor(signer: VerifiedWallet, poolAddress: string) {

        const address = poolAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
        this.balancerVault = "0xBA12222222228d8Ba445958a75a0704d566BF2C8"
    }

    //API below for single and batch swaps, and price and volume data from verified subgraphs for pool
    /**
    * API to perform Balancer Batch swap
    * @params (string _poolId,)
    * @returns {address[] memory}
    */
    public async batchSwap(_poolId: string, 
                _swapType: string,
                _poolType: string,
                _assetInIndex: string,
                _assetOutIndex: string, 
                _limitAmount: string, 
                _currencyAddress: string, 
                _securityAddress: string, 
                _vptAddress: string, 
                _amount: string, 
                _account: string,
                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, _poolId)
        await this.validateInput(DATATYPES.STRING, _swapType)
        await this.validateInput(DATATYPES.STRING, _poolType)
        await this.validateInput(DATATYPES.NUMBER, _assetInIndex)
        await this.validateInput(DATATYPES.NUMBER, _assetOutIndex)
        await this.validateInput(DATATYPES.NUMBER, _limitAmount)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _account)
        await this.validateInput(DATATYPES.ADDRESS, _currencyAddress)
        await this.validateInput(DATATYPES.ADDRESS, _securityAddress)
        await this.validateInput(DATATYPES.ADDRESS, _vptAddress)
        let tokensList = [undefined, undefined, undefined];
        if(_swapType === "Sell")
        {
            tokensList[_assetInIndex] = _securityAddress;
            if(_poolType === "PrimaryIssue")
                tokensList[_assetOutIndex] = _currencyAddress;
            else if(_poolType === "SecondaryIssue")
                tokensList[_assetOutIndex] = _vptAddress;
        }else if(_swapType === "Buy")
        {
            tokensList[_assetInIndex] = _currencyAddress;
            if(_poolType === "PrimaryIssue")
                tokensList[_assetOutIndex] = _securityAddress;
            else if(_poolType === "SecondaryIssue")
                tokensList[_assetOutIndex] = _vptAddress;
        }
        let remainingIndex = tokensList.findIndex(element => element === undefined);
        if(_poolType === "PrimaryIssue")
            tokensList[remainingIndex] = _vptAddress;
        else if(_poolType === "SecondaryIssue")
            tokensList[remainingIndex] = _currencyAddress;

        let limitArr = new Array(3).fill(0);
        limitArr[_assetInIndex] = _limitAmount;
        const encodedBatchSwapData = Swaps.encodeBatchSwap({
            kind: _swapType === "Sell" ? SwapType.SwapExactIn : SwapType.SwapExactOut,
            swaps: [
              {
                poolId: _poolId,
                assetInIndex: _assetInIndex,
                assetOutIndex: _assetOutIndex,
                amount: _amount,
                userData: "0x",
              },
            ],
            assets: tokensList,
            funds: {
              fromInternalBalance: false,
              recipient: _account,
              sender: _account,
              toInternalBalance: false,
            },
            limits: limitArr,
            deadline: "999999999999999999", // Infinity
        });
        const tx = {
        from: _account,
        to: this.balancerVault,
        data: encodedBatchSwapData,
        options
        // gasLimit: "2000000" || networkOptions.gasPrice,
        };
        //   let transactionData = await library.getSigner(account).sendTransaction(tx);
        return this.callContract(FUNCTIONS.BATCHSWAP,tx, options)
    }
}