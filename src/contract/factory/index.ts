// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Factory.json';

enum FUNCTIONS {
    GETTOKENCOUNT = 'getTokenCount',
    GETTOKEN = 'getToken',
    GETNAMEANDTYPE = 'getNameAndType'
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
    public async getCallback(eventName: string, callback: any) {
        await this.validateInput(DATATYPES.STRING, eventName)
        return this.getEvent(eventName, callback);
    }
    
}