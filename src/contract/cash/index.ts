// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Cash.json';

enum FUNCTIONS {
    PAYIN = 'payIn',
    REQUESTISSUE = 'requestIssue',
    BURNCASHTOKENS = 'burnCashTokens',
    TRANSFERFROM = 'transferFrom',
    BALANCE = 'balanceOf',
    ISSUE = 'CashIssued',
    REDEEM = 'CashRedeemed',
    TRANSFER = 'CashTransfer',
    EXCHANGE = 'CashDeposits'
}

export default class Cash extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, currencyAddress: string) {

        const address = currencyAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Request pay out [callable by manager]
     * @param (uint256 _tokens, address _payer, bytes32 _currency, address _sender)
     * @returns boolean
     */
     public async payIn(_tokens: string, _payer: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        await this.validateInput(DATATYPES.ADDRESS, _payer) 
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.PAYIN, _tokens, _payer, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    public async requestIssue(_amount: string, 
                            _buyer: string, 
                            _currency: string,
                            options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _buyer)
        await this.validateInput(DATATYPES.NUMBER, _amount)   
        await this.validateInput(DATATYPES.STRING, _currency)     
        return this.callContract(FUNCTIONS.REQUESTISSUE, _amount, _buyer, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    public async burnCashTokens(_tokens: string, _payer: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        await this.validateInput(DATATYPES.ADDRESS, _payer) 
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.BURNCASHTOKENS, _tokens, _payer, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    /**
    * An investor can also request cash tokens from Verified by paying in another cash token. 
    * For example, an investor can request a USD cash token by paying in a EUR cash token.
    * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
    * and the tokens parameter is a numeric specifying number of cash tokens paid in.
    * @param (address sender, address receiver, uint256 tokens)
    * @returns boolean
    */
    public async transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options)
    }       

    /* Request balance of wallet in contract
    */
    public async balanceOf(_wallet: string, options?:{ gasPrice: number, gasLimit: number}): any {
        await this.validateInput(DATATYPES.ADDRESS, _wallet)
        return this.callContract(FUNCTIONS.BALANCE, _wallet, options)
    }

    /* 
    emits event CashIssued(address indexed _party, bytes32 currency, uint256 amount);
    */
    public notifyCashIssue(callback: any): object {
        this.getEvent(FUNCTIONS.ISSUE, callback)
    }

    /* 
    emits event CashRedeemed(address indexed _party, bytes32 currency, bytes16 amount);
    */
    public notifyCashRedemption(callback: any): object {
        this.getEvent(FUNCTIONS.REDEEM, callback)
    }

    /* 
    emits event CashTransfer(address indexed from, address indexed to, uint tokens);
    */
    public notifyCashTransfer(callback: any): object {
        this.getEvent(FUNCTIONS.TRANSFER, callback)
    }

    /* 
    emits event CashDeposits(address indexed depositor, bytes32 currency, bytes16 amount);
    */
    public notifyCashExchange(callback: any): object {
        this.getEvent(FUNCTIONS.EXCHANGE, callback)
    }
}