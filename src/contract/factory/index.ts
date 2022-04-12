// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Factory.json';

enum FUNCTIONS {
    GETTOKENCOUNT = 'getTokenCount',
    GETTOKEN = 'getToken',
    GETNAMEANDTYPE = 'getNameAndType',
    TOKENCREATED = 'TokenCreated',
    GETTOKENBYNAMETYPE = 'getTokenByNameType',
    GETISSUER = 'getIssuer',
    GETADDRESSTYPE = 'getAddressAndType',
    SETORACLEURL = 'setViaOracleUrl',
    GETORACLEURL = 'getViaOracleUrl',
    SETPAYOUTURL = 'setFiatPayoutUrl',
    GETPAYOUTURL = 'getFiatPayoutUrl',
    SETSIGNER = 'setSigner',
    SETCRYPTODATAURL = 'setCryptoDataURL',
    SETORACLES = 'setOracles'
}

export default class FactoryContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
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

    public async setSigner(_signer: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _signer)
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options)
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

    public async setCryptoDataURL(_url: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _url)
        return this.callContract(FUNCTIONS.SETCRYPTODATAURL, _url, options)
    } 

    public async setOracles(_oracles: string, options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.SETORACLES, _oracles, options)
    } 

}