// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/deposits/L1Factory.json';

enum FUNCTIONS {
    GETNAME = 'getName',
    GETTYPE = 'getType',
    GETTOKENBYNAMETYPE = 'getTokenByNameType',
    GETISSUER = 'getIssuer'
}

export default class VerifiedFactory extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Get name of token 
     * @param   _token  address of token for which name is required
     * @returns         returns name of token
     */
    public async getName(_token: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        return this.callContract(FUNCTIONS.GETNAME, _token, options)
    }

    /**
     * Get type of token 
     * @param   _token  address of token for which type is required
     * @returns         returns name of token
     */
     public async getType(_token: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        return this.callContract(FUNCTIONS.GETTYPE, _token, options)
    }

    /**
     * Get name and type of token 
     * @param   _tokenName  string name of token
     * @param   _tokenType  string type of token
     * @returns             returns address of token
     */
    public async getTokenByNameType(tokenName: string, tokenType: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, tokenName)
        await this.validateInput(DATATYPES.STRING, tokenType)
        return this.callContract(FUNCTIONS.GETTOKENBYNAMETYPE, this.sanitiseInput(DATATYPES.BYTE32, tokenName), this.sanitiseInput(DATATYPES.BYTE32, tokenType), options)
    }

    /**
     * Get name and type of token issuer
     * @param   _tokenName  string name of token
     * @param   _tokenType  string type of token
     * @returns             returns address of token issuer
     */
    public async getIssuer(tokenName: string, tokenType: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, tokenName)
        await this.validateInput(DATATYPES.STRING, tokenType)
        return this.callContract(FUNCTIONS.GETISSUER, this.sanitiseInput(DATATYPES.BYTE32, tokenType), this.sanitiseInput(DATATYPES.BYTE32, tokenName), options)
    }
    
}