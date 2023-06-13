// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/assetmanager/Vault.json';
import contractAddress from '../../contractAddress';
import { ethers } from 'ethers'

enum FUNCTIONS {
    BATCHSWAP = 'batchSwap',
    SINGLESWAP = 'swap',
    GETPOOLTOKENS = 'getPoolTokens'
}

export default class PoolContract extends VerifiedContract {

    public contractAddress: string

    constructor(signer: VerifiedWallet) {

        const address = contractAddress['balancerVault'];
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    //API below for single and batch swaps, and price and volume data from verified subgraphs for pool
    /**
    * API to perform Balancer Batch swap
    * @params (string _poolId,)
    * @returns {address[] memory}
    */
    public async batchSwap(_poolId: string, 
                _swapType: string,
                _limitAmount: string, 
                _assetIn: string, 
                _assetOut: string, 
                _amount: string, 
                _account: string,
                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, _poolId)
        await this.validateInput(DATATYPES.STRING, _swapType)
        await this.validateInput(DATATYPES.NUMBER, _limitAmount)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _account)
        await this.validateInput(DATATYPES.ADDRESS, _assetIn)
        await this.validateInput(DATATYPES.ADDRESS, _assetOut)

        const poolTokens = (await this.fetchPoolTokens(_poolId)).response.result[0];

        const _assetInIndex = poolTokens.findIndex(address => address.toLowerCase() === _assetIn.toLowerCase());
        const _assetOutIndex = poolTokens.findIndex(address => address.toLowerCase() === _assetOut.toLowerCase());

        let limitArr = new Array(3).fill(0);
        limitArr[_assetInIndex] = _limitAmount;

        // Where are the tokens coming from/going to?
        const fund_struct = {
            "sender":				_account,
            "recipient":			_account,
            "fromInternalBalance": 	false,
            "toInternalBalance": 	false
        }
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
        
        return this.callContract(FUNCTIONS.BATCHSWAP, swapKind, swap_step_struct, poolTokens, fund_struct, limitArr, deadline, options)
    }

    public async singleSwap(_poolId: string, 
                _swapType: string,
                _assetIn: string,
                _assetOut: string, 
                _limitAmount: string, 
                _amount: string, 
                _account: string,
                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, _poolId)
        await this.validateInput(DATATYPES.STRING, _swapType)
        await this.validateInput(DATATYPES.ADDRESS, _assetIn)
        await this.validateInput(DATATYPES.ADDRESS, _assetOut)
        await this.validateInput(DATATYPES.NUMBER, _limitAmount)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _account)
      
        const swapKind = _swapType === "Sell" ? 0 : 1;
        // Where are the tokens coming from/going to?
        const fund_struct = {
            "sender":				_account,
            "recipient":			_account,
            "fromInternalBalance": 	false,
            "toInternalBalance": 	false
        }
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
        
        return this.callContract(FUNCTIONS.SINGLESWAP, swap_struct, fund_struct, _limitAmount, deadline, options)
    }

    public async fetchPoolTokens(_poolId: string, 
                            options?: { gasPrice, gasLimit }): any {
        return this.callContract(FUNCTIONS.GETPOOLTOKENS, _poolId, options);
    }
}