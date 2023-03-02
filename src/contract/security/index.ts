// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../abi/securities/Security.json';

enum FUNCTIONS {
    WHITELIST = 'whiteList'
}

export default class Security extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet, tokenAddress: string) {

        const address = tokenAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    public async whiteList(
                            _spender: string,
                            _amount: string, 
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _spender)
        await this.validateInput(DATATYPES.NUMBER, _amount)        
        return this.callContract(FUNCTIONS.WHITELIST, _spender, _amount, options)
    }
    
}