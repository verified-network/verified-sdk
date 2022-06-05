// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Rates.json';

enum FUNCTIONS {
    SETFEETO = 'setFeeTo',
    SETFEETOSETTER = 'setFeeToSetter',
    SETMARGIN = 'setMargin',
    SETTREASURY = 'setTreasury',
    SETCUSTODIAN = 'setCustodian',
    GETMARGIN = 'getMargin',
    GETFEE = 'getFee',
    GETFEETOSETTER = 'getFeeToSetter',
    GETCUSTODIAN = 'getCustodian',
    TRANSFERTOCUSTODY = 'transferToCustody'
}

export default class RatesContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = Object.keys(networks)
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async setFeeTo(_feeTo: string, _fee: string, _feeType: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _feeTo)
        await this.validateInput(DATATYPES.NUMBER, _fee)
        await this.validateInput(DATATYPES.STRING, _feeType)
        return this.callContract(FUNCTIONS.SETFEETO, _feeTo, _fee, this.sanitiseInput(DATATYPES.BYTE32, _feeType), options)
    }

    public async setFeeToSetter(_feeToSetter: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _feeToSetter)
        return this.callContract(FUNCTIONS.SETFEETOSETTER, _feeToSetter, options)
    }

    public async setMargin(_margin: string, _asset: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _margin)
        await this.validateInput(DATATYPES.STRING, _asset)
        return this.callContract(FUNCTIONS.SETMARGIN, _margin, this.sanitiseInput(DATATYPES.BYTE32, _asset), options)
    }

    public async setTreasury(_treasury: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _treasury)
        return this.callContract(FUNCTIONS.SETTREASURY, _treasury, options)
    }

    public async setCustodian(_custodian: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _custodian)
        return this.callContract(FUNCTIONS.SETCUSTODIAN, _custodian, options)
    }

    public async getMargin(_asset: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _asset)
        return this.callContract(FUNCTIONS.GETMARGIN, this.sanitiseInput(DATATYPES.BYTE32, _asset), options)
    }

    public async getFee(_feeType: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _feeType)
        return this.callContract(FUNCTIONS.GETFEE, this.sanitiseInput(DATATYPES.BYTE32, _feeType), options)
    }

    public async getFeeToSetter(){
        return this.callContract(FUNCTIONS.GETFEETOSETTER)
    }

    public async getCustodian(){
        return this.callContract(FUNCTIONS.GETCUSTODIAN)
    }

    public async transferToCustody(_percent: string, _transferFrom: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _percent)
        await this.validateInput(DATATYPES.ADDRESS, _transferFrom)
        return this.callContract(FUNCTIONS.TRANSFERTOCUSTODY, _percent, _transferFrom, options)
    }

}