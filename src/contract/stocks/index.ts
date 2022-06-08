// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/securities/Stocks.json';

enum FUNCTIONS {
    GETSHARE = 'getShare',
    STARTISSUE = 'startIssue',
    ASKOFFERS = 'askOffers',
    GETSUBSCRIBERS = 'getSubscribers',
    ALLOTISSUE = 'allotIssue',
    GETPAYMENTSTATUS = 'getPaymentStatusFor',
    ISALLPAIDFOR = 'isAllPaidFor',
    GETISSUEDATE = 'getDateOfIssue',
    PAYOUT = 'payOut',
    ISSUESHARE = 'issueShare',
    GETBENEFICIARIES = 'getBeneficiaries',
    SETLIQUIDITYPROVIDERS = 'setLiquidityProviders',
    SETPLATFORMPOOLS = 'setPlatformPools',
    SETPLATFORMSUBSCRIBERS = 'setPlatformSubscribers'
}

export default class StocksContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, issue: string) {

        const address = issue
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async getShare(){
        return this.callContract(FUNCTIONS.GETSHARE)
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

    public async payOut(_beneficiary: string, _currency: string, _amount: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _beneficiary)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        return this.callContract(FUNCTIONS.PAYOUT, _beneficiary, this.sanitiseInput(DATATYPES.BYTE32, _currency), _amount, options)
    }

    public async issueShare( _issueSize: string,
                            _offerPrice: string,
                            _minAskPrice: string,
                            _minSubscription: string,
                            _currency: string,
                            _offerType: string,
                            _isin: string,
                            _offeringDocuments: string,
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _issueSize)
        await this.validateInput(DATATYPES.NUMBER, _offerPrice)
        await this.validateInput(DATATYPES.NUMBER, _minAskPrice)
        await this.validateInput(DATATYPES.NUMBER, _minSubscription)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.STRING, _offerType)
        await this.validateInput(DATATYPES.STRING, _offeringDocuments)
        await this.validateInput(DATATYPES.STRING, _isin)
        return this.callContract(FUNCTIONS.ISSUESHARE, _issueSize, 
                                    _offerPrice,  
                                    _minAskPrice,
                                    _minSubscription,
                                    this.sanitiseInput(DATATYPES.BYTE32, _currency),
                                    this.sanitiseInput(DATATYPES.BYTE32, _offerType),
                                    this.sanitiseInput(DATATYPES.BYTE32, _isin),
                                    _offeringDocuments,
                                options)
    }

    public async setLiquidityProviders( platform: string, liquidityProviders: string, 
                _hashedMessage: string,
                _v: string,
                _r: string,
                _s: string,
                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, platform);
        await this.validateInput(DATATYPES.STRING, liquidityProviders);
        return this.callContract(FUNCTIONS.SETLIQUIDITYPROVIDERS, platform, liquidityProviders,
                    _hashedMessage, _v, _r, _s, options);
    }

    public async setPlatformPools(  platform: string, 
                                    securityToken: string, 
                                    pools: string,
                                    status: string,
                                    _hashedMessage: string,
                                    _v: string,
                                    _r: string,
                                    _s: string,
                                    options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, platform);
        await this.validateInput(DATATYPES.ADDRESS, securityToken);
        await this.validateInput(DATATYPES.STRING, pools);
        await this.validateInput(DATATYPES.STRING, status);
        return this.callContract(FUNCTIONS.SETPLATFORMPOOLS, platform, securityToken, pools, status,
                    _hashedMessage, _v, _r, _s, options);
    }

    public async setPlatformSubscribers(platform: string, 
                                        pool: string,
                                        eois: string,
                                        _hashedMessage: string,
                                        _v: string,
                                        _r: string,
                                        _s: string,
                                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, platform);
        await this.validateInput(DATATYPES.STRING, pool);
        await this.validateInput(DATATYPES.STRING, eois);
        return this.callContract(FUNCTIONS.SETPLATFORMSUBSCRIBERS, platform, this.sanitiseInput(DATATYPES.BYTE32, pool), eois,
                                _hashedMessage, _v, _r, _s, options);
    }

}