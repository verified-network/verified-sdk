// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../abi/securities/SecuritiesFactory.json';

enum FUNCTIONS {
    GETISSUES = 'getIssues',
    SETSIGNER = 'setSigner',
    ADDBALANCE = 'addBalance',
    ISSUESECURITY = 'issueSecurity',
    SECURITIESADDED = 'securitiesAdded',
    GETSECURITYTOKEN = 'getSecurityToken',
    GETHOLDER = 'getHolder',
    GETSECURITY = 'getSecurity',
    SETCUSTODIAN = 'setCustodian',
    GETCUSTODIAN = 'getCustodian'
}

export default class SecuritiesFactory extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
        
        const address = contractNetworkAddress
        //const chainId: string = Object.keys(networks)
        //const address = networks[chainId].address
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
     * Get issued security token addresses
     * @param
     * @returns returns array of addresses
     */
     public async getIssues() {
        return this.callContract(FUNCTIONS.GETISSUES)
    }

    public async getHolder(_token: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        return this.callContract(FUNCTIONS.GETHOLDER, _token, options)
    }

    public async getSecurity(_token: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        return this.callContract(FUNCTIONS.GETSECURITY, _token, options)
    }

    public async issueSecurity(_security: string,
                _company: string, 
                _isin: string, 
                _currency: string, 
                _issuer: string,
                _qualified: string,
                _hashedMessage: string,
                _v: string,
                _r: string,
                _s: string,
                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _security)
        await this.validateInput(DATATYPES.ADDRESS, _issuer)  
        return this.callContract(FUNCTIONS.ISSUESECURITY, _security, this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), this.sanitiseInput(DATATYPES.BYTE32, _currency), _issuer, 
                _qualified, _hashedMessage, _v, _r, _s, options)
    }

    public async getSecurityToken(security: string, issuer: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, security)
        await this.validateInput(DATATYPES.ADDRESS, issuer)
        return this.callContract(FUNCTIONS.GETSECURITYTOKEN, security, issuer, options)
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

    public async setCustodian(_securityToken: string, _issuer: string, _custodian: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _securityToken)
        await this.validateInput(DATATYPES.ADDRESS, _issuer)
        await this.validateInput(DATATYPES.ADDRESS, _custodian)
        return this.callContract(FUNCTIONS.SETCUSTODIAN, _securityToken, _issuer, _custodian, options)
    }

    public async getCustodian(_securityToken: string, _issuer: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _securityToken)
        await this.validateInput(DATATYPES.ADDRESS, _issuer)
        return this.callContract(FUNCTIONS.GETCUSTODIAN, _securityToken, _issuer, options)
    }
    
}