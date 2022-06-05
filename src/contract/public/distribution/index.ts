// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/L1distribution/Distribution.json';

enum FUNCTIONS {
    ADDREVENUESHAREHOLDER = 'addRevenueShareholder',
    GETREVENUESHAREHOLDER = 'getRevenueShareholders',
    GETPAYMENTFEECOLLECTED = 'getPaymentFeeCollected',
    GETLOANFEECOLLECTED = 'getLoanFeeCollected',
    SHAREFEE = 'shareFee'
}

export default class DistributionContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = Object.keys(networks)
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
        Shares fee income with revenue shareholders
     */
    public async shareFee(){
        return this.callContract(FUNCTIONS.SHAREFEE)
    }

    /**
        Gets payment fee collected
        @param  _currency   payment fee in currency collected
     */
    public async getPaymentFeeCollected(_currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.GETPAYMENTFEECOLLECTED, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    /**
        Gets loan fee collected
        @param  _currency   loan fee in currency collected
     */
    public async getLoanFeeCollected(_currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.GETLOANFEECOLLECTED, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    /**
        Get revenue shareholders
        @param  _type       type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _currency   currency revenue is collected
     */
    public async getRevenueShareholders(_type: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _type)
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.GETREVENUESHAREHOLDER, this.sanitiseInput(DATATYPES.BYTE32, _type), this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    /**
        Add revenue shareholders
        @param  _type           type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _shareholder    address of shareholder to add
        @param  _currency       currency revenue is collected
     */
    public async addRevenueShareholder(_type: string, _shareholder: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _type)
        await this.validateInput(DATATYPES.STRING, _shareholder)
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.ADDREVENUESHAREHOLDER, this.sanitiseInput(DATATYPES.BYTE32, _type), _shareholder, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

}