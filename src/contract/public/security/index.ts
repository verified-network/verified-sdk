// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/deposits/Security.json';

enum FUNCTIONS {
    APPROVETOKEN = 'approveToken'
}

export default class VerifiedSecurity extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet, tokenAddress: string) {

        const address = tokenAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    public async approveToken(_owner: string,
                            _spender: string,
                            _amount: string, 
                            _hashedMessage: string,
                            _v: string,
                            _r: string,
                            _s: string,
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _owner)
        await this.validateInput(DATATYPES.ADDRESS, _spender)
        await this.validateInput(DATATYPES.NUMBER, _amount)        
        return this.callContract(FUNCTIONS.APPROVETOKEN, _owner, _spender, _amount, _hashedMessage, _v, _r, _s, options)
    }
    
}