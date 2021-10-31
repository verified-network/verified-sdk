// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/liquidity/balancer/BalancerManager.json';

enum FUNCTIONS {
    MARKETMAKE = 'make'
}

export default class BalancerManagerContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async make(_owned: string, _isin: string, _offered: string, _tomatch: string, _desired: string, _min: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _owned)
        await this.validateInput(DATATYPES.STRING, _isin)
        await this.validateInput(DATATYPES.NUMBER, _offered)
        await this.validateInput(DATATYPES.ADDRESS, _tomatch)
        await this.validateInput(DATATYPES.NUMBER, _desired)
        await this.validateInput(DATATYPES.NUMBER, _min)
        return this.callContract(FUNCTIONS.MARKETMAKE, _owned, this.sanitiseInput(DATATYPES.BYTE32, _isin), _offered, _tomatch, _desired, _min, options)
    }

}