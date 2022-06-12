// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/deposits/Factory.json';

enum FUNCTIONS {
    GETNAME = 'getName',
    GETTYPE = 'getType',
    GETTOKENBYNAMETYPE = 'getTokenByNameType',
    GETISSUER = 'getIssuer',
    GETTOKENCOUNT = 'getTokenCount',
    GETTOKEN = 'getToken',
    GETNAMEANDTYPE = 'getNameAndType',
    SETSIGNER = 'setSigner',
    ADDBALANCE = 'addToBalance',
    ISSUESECURITY = 'issueSecurity',
    SECURITIESADDED = 'securitiesAdded'
}

export default class VerifiedFactory extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = Object.keys(networks)
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

    /**
     * Get number of tokens [callable by client]
     * @param
     * @returns returns number of tokens
     */
     public async getTokenCount() {
        return this.callContract(FUNCTIONS.GETTOKENCOUNT)
    }

    /**
    * Get address of token by index [callable by client].
    * @param (uint256 n)
    * @returns boolean
    */
     public async getToken(_n: string, options?: { gasPrice: number, gasLimit: number }): any {
        //await this.validateInput(DATATYPES.NUMBER, _n)
        return this.callContract(FUNCTIONS.GETTOKEN, _n, options)
    }

    /**
    * Get name and type of token by its address callable by client
    * @param (address _viaAddress)
    * @returns boolean
    * returns name and type of token by its address passed as parameter.
    */
     public async getNameAndType(_viaAddress: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _viaAddress)
        return this.callContract(FUNCTIONS.GETNAMEANDTYPE, _viaAddress, options)
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

    public async issueSecurity(_security: string,
                _company: string, 
                _isin: string, 
                _currency: string, 
                _issuer: string,
                _hashedMessage: string,
                _v: string,
                _r: string,
                _s: string,
                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _security)
        await this.validateInput(DATATYPES.ADDRESS, _issuer)        
        return this.callContract(FUNCTIONS.ISSUESECURITY, _security, this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), this.sanitiseInput(DATATYPES.BYTE32, _currency), _issuer, 
                _hashedMessage, _v, _r, _s, options)
    }

    public async addBalance(_security: string,
                            _transferor: string, 
                            _transferee: string, 
                            _amount: string, 
                            _hashedMessage: string,
                            _v: string,
                            _r: string,
                            _s: string,
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _security)
        await this.validateInput(DATATYPES.ADDRESS, _transferor)
        await this.validateInput(DATATYPES.ADDRESS, _transferee) 
        await this.validateInput(DATATYPES.NUMBER, _amount)             
        return this.callContract(FUNCTIONS.ADDBALANCE, _security, _transferor, _transferee, _amount, _hashedMessage, _v, _r, _s, options)
    }

    public notifySecuritiesAdded(callback: any): object {
        this.getEvent(FUNCTIONS.SECURITIESADDED, callback)
    }
    
}