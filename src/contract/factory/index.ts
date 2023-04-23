// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/payments/Factory.json';

enum FUNCTIONS {
    GETTOKENCOUNT = 'getTokenCount',
    GETTOKEN = 'getToken',
    GETNAMEANDTYPE = 'getNameAndType',
    GETTOKENBYNAMETYPE = 'getTokenByNameType',
    GETISSUER = 'getIssuer',
    GETADDRESSTYPE = 'getAddressAndType',
    GETORACLEURL = 'getViaOracleUrl',
    GETPAYOUTURL = 'getFiatPayoutUrl',
    GETORACLES = 'getOracles',
    SETORACLEURL = 'setViaOracleUrl',
    SETPAYOUTURL = 'setFiatPayoutUrl',
    SETCRYPTODATAURL = 'setCryptoDataURL',
    SETORACLES = 'setOracles',
    SUPPORTTOKENS = 'supportTokens',
    TOKENCREATED = 'TokenCreated'     
}

export default class Factory extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
        
        const address = contractNetworkAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Get number of tokens [callable by client]
     * @param
     * @returns returns number of tokens
     */
    public async getTokenCount() {
        return this.callContract(FUNCTIONS.GETTOKENCOUNT)
    }

    public async getOracles() {
        return this.callContract(FUNCTIONS.GETORACLES)
    }

    /**
    * Get address of token by index [callable by client].
    * @param (uint256 n)
    * @returns boolean
    */
    public async getToken(_n: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _n)
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

    /*
        Watches and notifies event (TokenCreated) that is emitted when the factory creates a bond token.
    */
    public notifyTokenCreated(callback: any): object {
        this.getEvent(FUNCTIONS.TOKENCREATED, callback)
    }

    public async getTokenByNameType(tokenName: string, tokenType: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, tokenName)
        await this.validateInput(DATATYPES.STRING, tokenType)
        return this.callContract(FUNCTIONS.GETTOKENBYNAMETYPE, this.sanitiseInput(DATATYPES.BYTE32, tokenName), this.sanitiseInput(DATATYPES.BYTE32, tokenType), options)
    }

    public async getIssuer(tokenName: string, tokenType: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, tokenName)
        await this.validateInput(DATATYPES.STRING, tokenType)
        return this.callContract(FUNCTIONS.GETISSUER, this.sanitiseInput(DATATYPES.BYTE32, tokenName), this.sanitiseInput(DATATYPES.BYTE32, tokenType), options)
    }

    public async getAddressAndType(tokenName: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, tokenName)
        return this.callContract(FUNCTIONS.GETADDRESSTYPE, this.sanitiseInput(DATATYPES.BYTE32, tokenName), options)
    }

    public async setViaOracleUrl(_url: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _url)
        return this.callContract(FUNCTIONS.SETORACLEURL, _url, options)
    }   
    
    public async setFiatPayoutUrl(_url: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _url)
        return this.callContract(FUNCTIONS.SETPAYOUTURL, _url, options)
    } 

    public async getViaOracleUrl(options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.GETORACLEURL, options)
    }   
    
    public async getFiatPayoutUrl(options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.GETPAYOUTURL, options)
    } 

    public async setCryptoDataURL(_url: string, _fromCurrency: string, _toCurrency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _url)
        await this.validateInput(DATATYPES.STRING, _fromCurrency)
        await this.validateInput(DATATYPES.STRING, _toCurrency)
        return this.callContract(FUNCTIONS.SETCRYPTODATAURL, _url, this.sanitiseInput(DATATYPES.BYTE32, _fromCurrency), this.sanitiseInput(DATATYPES.BYTE32, _toCurrency), options)
    } 

    public async setOracles(_oracles: string, options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.SETORACLES, _oracles, options)
    } 

    public async supportTokens(_currency: string, _address: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.ADDRESS, _address)
        return this.callContract(FUNCTIONS.SUPPORTTOKENS, this.sanitiseInput(DATATYPES.BYTE32, _currency), _address, options)
    } 

}