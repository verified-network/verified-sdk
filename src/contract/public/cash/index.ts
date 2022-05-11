// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/deposits/L1Cash.json';

enum FUNCTIONS {
    SUPPORTTOKENS = 'supportTokens',
    CHECKSUPPORTFORTOKEN = 'checkSupportForToken',
    GETSUPPORTEDTOKENS = 'getSupportedTokens',
    REQUESTISSUE = 'requestIssue',
    SETSIGNER = 'setSigner',
    ADDISSUEDBALANCE = 'addIssuedBalance',
    TRANSFERDEPOSIT = 'transferDeposit',
    REDEEMDEPOSITS = 'redeemDeposits',
    TRANSFERISSUEDBALANCE = 'transferIssuedBalance',
    CASHISSUEREQUEST = 'CashIssueRequest',
    CASHREDEEMED = 'CashRedeemed',
    CASHTRANSFER = 'CashTransfer',
    CASHISSUED = 'CashIssued',
    ADDEDL2BALANCE = 'addedL2Balance',
    TRANSFERREDL2BALANCE = 'transferredL2Balance'
}

export default class VerifiedCash extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet, currencyAddress: string) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = currencyAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    /**
        Specifies list of supported tokens that can be invested in the Verified Liquidity token
        @param  _tokens address of token supported
        @param  _name   string name of token supported
     */
    public async supportTokens(_tokens: string, _name: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _tokens)
        await this.validateInput(DATATYPES.STRING, _name)
        return this.callContract(FUNCTIONS.SUPPORTTOKENS, _tokens, this.sanitiseInput(DATATYPES.BYTE32, _name), options)
    }

    /**
        Checks if a specified token is supported for investing in the Verified Liquidity token
        @param  _token  token that is supported for investment
     */
    public async checkSupportForToken(_token: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        return this.callContract(FUNCTIONS.CHECKSUPPORTFORTOKEN, _token, options)
    }

    /**
     * Returns list of supported liquidity tokens (eg, VITTA, USDC, DAI)
     * @returns array of struct of tokens 
     */
    public async getSupportedTokens(){
        return this.callContract(FUNCTIONS.GETSUPPORTEDTOKENS);
    }

    /**
        Used by external apps (eg, exchange, wallet) to buy Verified cash token 
        @param  _token  address of token used by investor to buy the cash token
        @param  _amount amount of token that is transferred from investor to this cash token issuing contract
        @param  _buyer  address of buyer
     */
    public async requestIssue(_token: string, _amount: string, _buyer: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _buyer)
        return this.callContract(FUNCTIONS.REQUESTISSUE, _token, _amount, _buyer, options)
    }

    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    public async setSigner(_signer: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _signer)
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options)
    } 

    public async addIssuedBalance(_amount: string, 
                                _buyer: string, 
                                _currency: string, 
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _buyer)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.NUMBER, _v)
        return this.callContract(FUNCTIONS.ADDISSUEDBALANCE, _amount, _buyer, this.sanitiseInput(DATATYPES.BYTE32, _currency), 
                                this.sanitiseInput(DATATYPES.BYTE32, _hashedMessage), 
                                _v, this.sanitiseInput(DATATYPES.BYTE32, _r), this.sanitiseInput(DATATYPES.BYTE32, _s), options)
    }

    public async transferDeposit(_transferor: string, 
                                _amount: string, 
                                _transferee: string, 
                                _currency: string,
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _transferor)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _transferee)
        await this.validateInput(DATATYPES.NUMBER, _v)
        return this.callContract(FUNCTIONS.TRANSFERDEPOSIT, _transferor, _amount, _transferee, 
                                this.sanitiseInput(DATATYPES.BYTE32, _currency), 
                                this.sanitiseInput(DATATYPES.BYTE32, _hashedMessage), 
                                _v, this.sanitiseInput(DATATYPES.BYTE32, _r), this.sanitiseInput(DATATYPES.BYTE32, _s), options)
    }

    public async redeemDeposits(_amount: string, 
                                _redeemer: string, 
                                _currency: string, 
                                _redeemedFor: string,
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _redeemer)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.NUMBER, _redeemedFor)
        await this.validateInput(DATATYPES.NUMBER, _v)
        return this.callContract(FUNCTIONS.REDEEMDEPOSITS, _amount, _redeemer, this.sanitiseInput(DATATYPES.BYTE32, _currency), 
                                _redeemedFor, this.sanitiseInput(DATATYPES.BYTE32, _hashedMessage), 
                                _v, this.sanitiseInput(DATATYPES.BYTE32, _r), this.sanitiseInput(DATATYPES.BYTE32, _s), options)
    }

    public async transferIssuedBalance( _transferor: string,
                                        _currency: string,
                                        _amount: string, 
                                        _deposited: string, 
                                        _hashedMessage: string,
                                        _v: string,
                                        _r: string,
                                        _s: string,
                                        options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _transferor)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.NUMBER, _deposited)
        await this.validateInput(DATATYPES.NUMBER, _v)
        return this.callContract(FUNCTIONS.TRANSFERISSUEDBALANCE, _transferor, _currency, _amount, _deposited, 
                                this.sanitiseInput(DATATYPES.BYTE32, _hashedMessage), 
                                _v, this.sanitiseInput(DATATYPES.BYTE32, _r), this.sanitiseInput(DATATYPES.BYTE32, _s), options)
    }

    public notifyCashIssueRequest(callback: any): object {
        this.getEvent(FUNCTIONS.CASHISSUEREQUEST, callback)
    }

    public notifyCashRedemption(callback: any): object {
        this.getEvent(FUNCTIONS.CASHREDEEMED, callback)
    }

    public notifyCashTransfer(callback: any): object {
        this.getEvent(FUNCTIONS.CASHTRANSFER, callback)
    }

    public notifyCashIssue(callback: any): object {
        this.getEvent(FUNCTIONS.CASHISSUED, callback)
    }

    public notifyL2BalanceAdded(callback: any): object {
        this.getEvent(FUNCTIONS.ADDEDL2BALANCE, callback)
    }

    public notifyL2BalanceTransferred(callback: any): object {
        this.getEvent(FUNCTIONS.TRANSFERREDL2BALANCE, callback)
    }

}