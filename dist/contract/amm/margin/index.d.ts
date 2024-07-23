import { VerifiedContract } from '../../index';
import { VerifiedWallet } from "../../../wallet";
export default class MarginIssueManager extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    issueProduct(security: string, securityType: string, currency: string, cficode: string, securityAmount: string, minOrderSize: string, currencyAmount: string, margin: string, collateral: string, tradeFee: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    close(security: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    offerCollateral(currency: string, amount: string, security: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    sendCollateral(currency: string, amount: string, security: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getCollateral(poolId: string, currency: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    onMatch(party: string, counterparty: string, orderRef: string, security: string, securityTraded: string, currency: string, cashTraded: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    onTrade(ref: string, cref: string, security: string, securityTraded: string, currency: string, currencyTraded: string, executionTime: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    onSettle(security: string, currency: string, financingBid: string, financingOffer: string, dividendBid: string, dividendOffer: string, swapLong: string, swapShort: string, settlementTime: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    withdraw(security: string, currency: string, amount: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
}
