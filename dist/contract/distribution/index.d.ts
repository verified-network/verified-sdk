import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../../wallet";
export default class Distribution extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    /**
        Shares fee income with revenue shareholders
     */
    shareFee(): any;
    shareCollection(): any;
    /**
        Gets payment fee collected
        @param  _currency   payment fee in currency collected
     */
    getPaymentFeeCollected(_currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Gets loan fee collected
        @param  _currency   loan fee in currency collected
     */
    getLoanFeeCollected(_currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Get revenue shareholders
        @param  _type       type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _currency   currency revenue is collected
     */
    getRevenueShareholders(_type: string, _currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Add revenue shareholders
        @param  _type           type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _shareholder    address of shareholder to add
        @param  _currency       currency revenue is collected
     */
    addRevenueShareholder(_type: string, _shareholder: string, _currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getIssuingFeeCollected(_platform: string, _token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getTradingFeeCollected(_platform: string, _token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifyRevenueShare(callback: any): object;
}
