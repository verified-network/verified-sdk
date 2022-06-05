// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/securities/Bonds.json';

enum FUNCTIONS {
    GETBOND = 'getBond',
    STARTISSUE = 'startIssue',
    ASKOFFERS = 'askOffers',
    GETSUBSCRIBERS = 'getSubscribers',
    ALLOTISSUE = 'allotIssue',
    NEXTINSTALLMENT = 'computeNextInstallment',
    GETPAYMENTFOR = 'getPaymentAmountFor',
    GETPAYMENTSTATUS = 'getPaymentStatusFor',
    ISALLPAIDFOR = 'isAllPaidFor',
    GETISSUEDATE = 'getDateOfIssue',
    GETMATURITYDATE = 'getmaturityDate',
    GETFIRSTCOUPONDATE = 'getfirstCouponDate',
    GETNEXTCOUPONDATE = 'computeNextCouponDate',
    GETCOUPONFREQUENCY = 'getcouponFrequencyInMonths',
    GETINTERESTRATE = 'getinterestRateInBips',
    PAYOUT = 'payOut',
    ISSUEBOND = 'issueBond',
    GETBENEFICIARIES = 'getBeneficiaries'
}

export default class BondsContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, issue: string) {

        const address = issue
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async getBond(){
        return this.callContract(FUNCTIONS.GETBOND)
    }

    public async askOffers(){
        return this.callContract(FUNCTIONS.ASKOFFERS)
    }

    public async getBeneficiaries(){
        return this.callContract(FUNCTIONS.GETBENEFICIARIES)
    }

    public async startIssue(cutOffTime: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, cutOffTime)
        return this.callContract(FUNCTIONS.STARTISSUE, cutOffTime, options)
    }

    public async getSubscribers(){
        return this.callContract(FUNCTIONS.GETSUBSCRIBERS)
    }

    public async allotIssue(_allotment: string, _platform: string, _pool: string, _investor: string, _amount: string, _asset: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _allotment)
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        await this.validateInput(DATATYPES.STRING, _pool)
        await this.validateInput(DATATYPES.ADDRESS, _investor)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _asset)
        return this.callContract(FUNCTIONS.ALLOTISSUE, this.sanitiseInput(DATATYPES.BYTE32, _allotment), 
                                                        _platform, this.sanitiseInput(DATATYPES.BYTE32, _pool), _investor, _amount, _asset, options)
    }

    public async computeNextInstallment(_currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _currency)
        return this.callContract(FUNCTIONS.NEXTINSTALLMENT, _currency, options)
    }

    public async getPaymentAmountFor(_beneficiary: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _beneficiary)
        return this.callContract(FUNCTIONS.GETPAYMENTFOR, _beneficiary, options)
    }

    public async getPaymentStatusFor(_beneficiary: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _beneficiary)
        return this.callContract(FUNCTIONS.GETPAYMENTSTATUS, _beneficiary, options)
    }

    public async isAllPaidFor(_byTime: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _byTime)
        return this.callContract(FUNCTIONS.ISALLPAIDFOR, _byTime, options)
    }

    public async getDateOfIssue(){
        return this.callContract(FUNCTIONS.GETISSUEDATE)
    }

    public async getmaturityDate(){
        return this.callContract(FUNCTIONS.GETMATURITYDATE)
    }

    public async getfirstCouponDate(){
        return this.callContract(FUNCTIONS.GETFIRSTCOUPONDATE)
    }

    public async computeNextCouponDate(){
        return this.callContract(FUNCTIONS.GETNEXTCOUPONDATE)
    }

    public async getcouponFrequencyInMonths(){
        return this.callContract(FUNCTIONS.GETCOUPONFREQUENCY)
    }

    public async getinterestRateInBips(_currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _currency)
        return this.callContract(FUNCTIONS.GETINTERESTRATE, _currency, options)
    }

    public async payOut(_beneficiary: string, _currency: string, _amount: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _beneficiary)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        return this.callContract(FUNCTIONS.PAYOUT, _beneficiary, this.sanitiseInput(DATATYPES.BYTE32, _currency), _amount, options)
    }

    public async issueBond( _issueSize: string,
                            _offerPrice: string,
                            _minAskPrice: string,
                            _minSubscription: string,
                            _couponPaymentCycle: string,
                            _tenure: string,
                            _currency: string,
                            _offerType: string,
                            _isin: string,
                            _offeringDocuments: string,
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _issueSize)
        await this.validateInput(DATATYPES.NUMBER, _offerPrice)
        await this.validateInput(DATATYPES.NUMBER, _minAskPrice)
        await this.validateInput(DATATYPES.NUMBER, _minSubscription)
        await this.validateInput(DATATYPES.NUMBER, _couponPaymentCycle)
        await this.validateInput(DATATYPES.NUMBER, _tenure)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.STRING, _offerType)
        await this.validateInput(DATATYPES.STRING, _isin)
        await this.validateInput(DATATYPES.STRING, _offeringDocuments)
        return this.callContract(FUNCTIONS.ISSUEBOND, _issueSize, 
                                    _offerPrice,  
                                    _minAskPrice,
                                    _minSubscription,
                                    _couponPaymentCycle,
                                    _tenure,
                                    this.sanitiseInput(DATATYPES.BYTE32, _currency),
                                    this.sanitiseInput(DATATYPES.BYTE32, _offerType),
                                    this.sanitiseInput(DATATYPES.BYTE32, _isin),
                                    _offeringDocuments,
                options)
    }

}