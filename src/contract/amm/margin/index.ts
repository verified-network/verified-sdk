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
    ONMATCH = 'onMatch',
    ONTRADE = 'onTrade',
    ONSETTLE = 'onSettle',
    WITHDRAW = 'withdraw'
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
        return this.callContract(FUNCTIONS.ISSUESECONDARY, security, this.sanitiseInput(DATATYPES.BYTE32, securityType), currency, this.sanitiseInput(DATATYPES.BYTE32, cficode), securityAmount, minOrderSize, currencyAmount, margin, collateral, tradefee, options);
    }

    public async close( 
        poolId: string, 
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.CLOSE, poolId, options);
    }

    public async offerCollateral( 
        currency: string, 
        amount: string,
        poolId: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, amount);
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.OFFERCOLLATERAL, currency, amount, this.sanitiseInput(DATATYPES.BYTE32, poolId), options);
    }

    public async sendCollateral( 
        currency: string, 
        amount: string,
        poolId: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, amount);
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.SENDCOLLATERAL, currency, amount, this.sanitiseInput(DATATYPES.BYTE32, poolId), options);
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
        await this.validateInput(DATATYPES.STRING, orderRef);
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.NUMBER, securityTraded);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, cashTraded);
        return this.callContract(FUNCTIONS.ONMATCH, party, counterparty, this.sanitiseInput(DATATYPES.BYTE32, orderRef), security, securityTraded, currency, cashTraded, options);
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
        await this.validateInput(DATATYPES.STRING, ref);
        await this.validateInput(DATATYPES.STRING, cref);
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.NUMBER, securityTraded);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, currencyTraded);
        await this.validateInput(DATATYPES.NUMBER, executionTime);
        return this.callContract(FUNCTIONS.ONTRADE, this.sanitiseInput(DATATYPES.BYTE32, ref), this.sanitiseInput(DATATYPES.BYTE32, cref), security, securityTraded, currency, currencyTraded, executionTime, options);
    }

    public async onSettle( 
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
    }

    public async withdraw( 
        security: string, 
        currency: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        return this.callContract(FUNCTIONS.WITHDRAW, currency, security, currency, options);
    }

}