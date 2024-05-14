import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Cash extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, currencyAddress: string);
    /**
     * Request pay out [callable by manager]
     * @param (uint256 _tokens, address _payer, bytes32 _currency, address _sender)
     * @returns boolean
     */
    payIn(_tokens: string, _payer: string, _currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    requestIssue(_amount: string, _buyer: string, _currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    burnCashTokens(_tokens: string, _payer: string, _currency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
    * An investor can also request cash tokens from Verified by paying in another cash token.
    * For example, an investor can request a USD cash token by paying in a EUR cash token.
    * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
    * and the tokens parameter is a numeric specifying number of cash tokens paid in.
    * @param (address sender, address receiver, uint256 tokens)
    * @returns boolean
    */
    transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    balanceOf(_wallet: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifyCashIssue(callback: any): object;
    notifyCashRedemption(callback: any): object;
    notifyCashTransfer(callback: any): object;
    notifyCashExchange(callback: any): object;
}
