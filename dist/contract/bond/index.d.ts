import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Bond extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, bondCurrencyAddress: string);
    requestIssue(_amount: string, _payer: string, _currency: string, _cashContract: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    requestPurchase(_amount: string, _payer: string, _currency: string, _cashContract: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    requestRedemption(_amount: string, _payer: string, _currency: string, _tokenContract: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getBonds(): any;
    /**
    * Fetch bonds issued with their balance amounts to redeem [callable by client]
    * entries is count of results to return. Address[] has issued bond addresses, and uint[] has issued amount
    * @param ()
    * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
    */
    getBondIssues(_issuer: string, _bond: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
    * Fetch bonds purchased with their purchased amounts [callable by client]
    * entries is count of results to return. Address[] has purchased bond addresses, and uint[] has purchased amount
    * @param ()
    * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
    */
    getBondPurchases(_issuer: string, _bond: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifyBondIssue(callback: any): object;
    notifyBondRedemption(callback: any): object;
    notifyBondPurchase(callback: any): object;
    notifyBondLiquidation(callback: any): object;
}
