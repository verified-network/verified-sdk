// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/balancer/BalancerManager.json';

enum FUNCTIONS {
    OFFER = 'offer',
    GETOFFERED = 'getOffered',
    GETALLOTTEDSTAKE = 'getAllotedStake'
}

export default class BalancerManager extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async offer(owned: string, isin: string, offered:string, tomatch:string, desired:string, min:string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, owned);
        await this.validateInput(DATATYPES.ADDRESS, tomatch);
        await this.validateInput(DATATYPES.STRING, isin);
        await this.validateInput(DATATYPES.NUMBER, offered);
        await this.validateInput(DATATYPES.NUMBER, desired);
        await this.validateInput(DATATYPES.NUMBER, min);
        return this.callContract(FUNCTIONS.OFFER, owned, this.sanitiseInput(DATATYPES.BYTE32, isin), offered, tomatch, desired, min, options);
    }

    /**
     * Gets security tokens offered for passed token parameter
     * @param offered   address of liquidity token offered by asset manager 
     * @param options 
     * @returns         array of structs of security tokens matching with offered liquidity token 
     */
    public async getOffered(offered: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, offered);
        return this.callContract(FUNCTIONS.GETOFFERED, offered, options);
    }

    /**
     * Gets allotted liquidity stake for caller (asset manager) that is available to invest
     * @param options 
     * @returns         amount of available liquidity for caller (asset manager)
     */
    public async getAllotedStake(options?: { gasPrice, gasLimit }): any {
        return this.callContract(FUNCTIONS.GETALLOTTEDSTAKE, options);
    }
    
}