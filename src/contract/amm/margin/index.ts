// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/assetmanager/balancer/MarginIssueManager.json';

enum FUNCTIONS {
    ISSUEPRODUCT = 'issueProduct',
    CLOSE = 'close',
    OFFERCOLLATERAL = 'offerCollateral',
    SENDCOLLATERAL = 'sendCollateral',
    GETCOLLATERAL = 'getCollateral',
    GETUSERCOLLATERAL = 'getUserCollateral',
    ONMATCH = 'onMatch',
    ONTRADE = 'onTrade',
    ONSETTLE = 'onSettle',
    WITHDRAW = 'withdraw',
    GETPOOL = 'getPool'
}

export default class MarginIssueManager extends VerifiedContract {
    
    public contractAddress: string

    constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
        
        const address = contractNetworkAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async issueProduct( 
        security: string, 
        securityType: string,
        currency:string, 
        cficode: string,
        securityAmount:string, 
        minOrderSize: string,
        currencyAmount:string,
        margin: string,
        collateral: string,
        tradeFee: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.STRING, securityType);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.STRING, cficode);
        await this.validateInput(DATATYPES.NUMBER, securityAmount);
        await this.validateInput(DATATYPES.NUMBER, minOrderSize);
        await this.validateInput(DATATYPES.NUMBER, currencyAmount);
        await this.validateInput(DATATYPES.NUMBER, margin);
        await this.validateInput(DATATYPES.NUMBER, collateral);
        await this.validateInput(DATATYPES.NUMBER, tradeFee);
        return this.callContract(FUNCTIONS.ISSUEPRODUCT, security, this.sanitiseInput(DATATYPES.BYTE32, securityType), currency, this.sanitiseInput(DATATYPES.BYTE32, cficode), securityAmount, minOrderSize, currencyAmount, margin, collateral, tradeFee, options);
    }

    public async close( 
        security: string, 
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.CLOSE, security, options);
    }

    public async offerCollateral( 
        currency: string, 
        amount: string,
        security: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, amount);
        await this.validateInput(DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.OFFERCOLLATERAL, currency, amount, security, options);
    }

    public async sendCollateral( 
        currency: string, 
        amount: string,
        security: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, amount);
        await this.validateInput(DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.SENDCOLLATERAL, currency, amount, security, options);
    }

    public async getCollateral( 
        poolId: string, 
        currency: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETCOLLATERAL, this.sanitiseInput(DATATYPES.BYTE32, poolId), currency, options);
    }

    public async getUserCollateral( 
        party: string, 
        currency: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.ADDRESS, party);
        return this.callContract(FUNCTIONS.GETUSERCOLLATERAL, party, currency, options);
    }

    public async getPool( 
        poolId: string, 
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETCOLLATERAL, this.sanitiseInput(DATATYPES.BYTE32, poolId), options);
    }

    public async onMatch( 
        party: string, 
        counterparty: string,
        orderRef:string, 
        security: string,
        securityTraded:string, 
        currency: string,
        cashTraded:string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, party);
        await this.validateInput(DATATYPES.ADDRESS, counterparty);
        //await this.validateInput(DATATYPES.STRING, orderRef);
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.NUMBER, securityTraded);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, cashTraded);
        return this.callContract(FUNCTIONS.ONMATCH, party, counterparty, orderRef, security, securityTraded, currency, cashTraded, options);
    }

    public async onTrade( 
        ref: string, 
        cref: string,
        security: string,
        securityTraded:string, 
        currency: string,
        currencyTraded:string,
        executionTime:string,
        options?: { gasPrice, gasLimit }): any {
        //await this.validateInput(DATATYPES.STRING, ref);
        //await this.validateInput(DATATYPES.STRING, cref);
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.NUMBER, securityTraded);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, currencyTraded);
        await this.validateInput(DATATYPES.NUMBER, executionTime);
        return this.callContract(FUNCTIONS.ONTRADE, ref, cref, security, securityTraded, currency, currencyTraded, executionTime, options);
    }

    /*public async onSettle( 
        security: string, 
        currency: string,
        financingPerSec:string, 
        charge: string,
        dividendPerSec:string, 
        payout: string,
        settlementTime:string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, financingPerSec);
        await this.validateInput(DATATYPES.BOOLEAN, charge);
        await this.validateInput(DATATYPES.NUMBER, dividendPerSec);
        await this.validateInput(DATATYPES.BOOLEAN, payout);
        await this.validateInput(DATATYPES.NUMBER, settlementTime);
        return this.callContract(FUNCTIONS.ONSETTLE, security, currency, financingPerSec, charge, dividendPerSec, payout, settlementTime, options);
    }*/

    public async onSettle( 
        security: string, 
        currency: string,
        financingBid:string, 
        financingOffer:string, 
        dividendBid:string,
        dividendOffer:string, 
        swapLong: string,
        swapShort: string,
        settlementTime: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, financingBid);
        await this.validateInput(DATATYPES.NUMBER, financingOffer);
        await this.validateInput(DATATYPES.NUMBER, dividendBid);
        await this.validateInput(DATATYPES.NUMBER, dividendOffer);
        await this.validateInput(DATATYPES.NUMBER, swapLong);
        await this.validateInput(DATATYPES.NUMBER, swapShort);
        await this.validateInput(DATATYPES.NUMBER, settlementTime);
        return this.callContract(FUNCTIONS.ONSETTLE, security, currency, financingBid, financingOffer, dividendBid, dividendOffer, swapLong, swapShort, settlementTime, options);
    }

    public async withdraw( 
        security: string, 
        currency: string,
        amount: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, amount);
        return this.callContract(FUNCTIONS.WITHDRAW, security, currency, amount, options);
    }

}