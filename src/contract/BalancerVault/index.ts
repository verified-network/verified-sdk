// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../abi/BalancerVault/Vault.json';
import contractAddress from '../../contractAddress';

enum FUNCTIONS {
    SWAP = 'swap',
    BATCHSWAP = 'batchSwap',
}

type SingleSwap = {
    poolId: string,
    kind: string,
    assetIn: string,
    assetOut: string,
    amount: string,
    userData: string,
}

type Swap = {
    poolId: string,
    assetInIndex: string,
    assetOutIndex: string,
    amount: string,
    userData: string,
}


type Funds = {
    sender: string,
    fromInternalBalance: boolean,
    recipient: string,
    toInternalBalance: boolean,
}

export default class BalancerVault extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const address = contractAddress['balancerVault']
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    public async swap(
        _swap: SingleSwap,
        _funds: Funds,
        _limit: string,
        _deadline: string,
        options?: { gasPrice: number, gasLimit: number }): any {
        const {
            poolId,
            kind,
            assetIn,
            assetOut,
            amount,
            userData
        } = _swap;
        const {
            sender,
            fromInternalBalance,
            recipient,
            toInternalBalance
        } = _funds;
        await this.validateInput(DATATYPES.NUMBER, kind)
        await this.validateInput(DATATYPES.ADDRESS, assetIn)
        await this.validateInput(DATATYPES.ADDRESS, assetOut)  
        await this.validateInput(DATATYPES.NUMBER, amount)
        await this.validateInput(DATATYPES.ADDRESS, sender)
        await this.validateInput(DATATYPES.ADDRESS, recipient)
        await this.validateInput(DATATYPES.NUMBER, _limit)
        await this.validateInput(DATATYPES.NUMBER, _deadline)
        return this.callContract(FUNCTIONS.SWAP, _swap, _funds, _limit, _deadline, options)
    }

    public async batchSwap(
        _kind: string,
        _swaps: Swap[],
        _assests: string[],
        _funds: Funds,
        _limits: string[],
        _deadline: string,
        options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _kind)
        _swaps.map(async(swp) => {
            const { 
                poolId,
                assetInIndex,
                assetOutIndex,
                amount,
                userData
            } = swp;
            await this.validateInput(DATATYPES.NUMBER, assetInIndex)
            await this.validateInput(DATATYPES.NUMBER, assetOutIndex)      
            await this.validateInput(DATATYPES.NUMBER, amount)
        })
        _assests.map(async(asst) => {
            await this.validateInput(DATATYPES.ADDRESS, asst)
        })
        const {
            sender,
            fromInternalBalance,
            recipient,
            toInternalBalance
        } = _funds;
        await this.validateInput(DATATYPES.ADDRESS, sender)
        await this.validateInput(DATATYPES.ADDRESS, recipient)
        _limits.map(async(lmt) => {
            await this.validateInput(DATATYPES.NUMBER, lmt)
        })
        await this.validateInput(DATATYPES.NUMBER, _deadline)        
        return this.callContract(FUNCTIONS.BATCHSWAP, _kind, _swaps, _assests, _funds, _limits, _deadline, options)
    }
}