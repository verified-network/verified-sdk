// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/deposits/Security.json';

enum FUNCTIONS {
    SETSIGNER = 'setSigner',
    ADDBALANCE = 'addToBalance',
    TRANSFERBALANCE = 'transferBalance',
    SECURITIESADDED = 'securitiesAdded'
}

export default class VerifiedSecurity extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    public async setSigner(_signer: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _signer)
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options)
    } 

    public async addToBalance(_isin: string,
                            _amount: string, 
                            _tokenHolder: string, 
                            _currency: string, 
                            _hashedMessage: string,
                            _v: string,
                            _r: string,
                            _s: string,
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _tokenHolder)
        await this.validateInput(DATATYPES.NUMBER, _amount)        
        return this.callContract(FUNCTIONS.ADDBALANCE, this.sanitiseInput(DATATYPES.BYTE32, _isin), _amount, _tokenHolder, this.sanitiseInput(DATATYPES.BYTE32, _currency), 
                            _hashedMessage, _v, _r, _s, options)
    }

    public async transferBalance(_isin: string,
                                _transferor: string,
                                _amount: string, 
                                _transferee: string, 
                                _currency: string, 
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _transferee)
        await this.validateInput(DATATYPES.ADDRESS, _transferor)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        return this.callContract(FUNCTIONS.TRANSFERBALANCE, this.sanitiseInput(DATATYPES.BYTE32, _isin), _transferor, _amount, _transferee, this.sanitiseInput(DATATYPES.BYTE32, _currency), 
                                _hashedMessage, _v, _r, _s, options)
    }

    public notifySecuritiesAdded(callback: any): object {
        this.getEvent(FUNCTIONS.SECURITIESADDED, callback)
    }
    
}