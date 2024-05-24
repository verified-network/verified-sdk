// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Token.json';

enum FUNCTIONS {
    TRANSFERFROM = 'transferFrom',
    BALANCE = 'balanceOf',
    NAME = "name",
    DECIMALS = "decimals",
    GETISSUER = 'getIssuer',
    REQUESTTRANSACTION = 'requestTransaction',
    REQUESTTRANSFER = 'requestTransfer',
    SYMBOL = 'symbol',
    TOTALSUPPLY = 'totalSupply',
    TRANSFER = 'transfer',
    APPROVE = 'approve',
    ALLOWANCE = 'allowance',
    INCREASEALLOWANCE = 'increaseAllowance',
    DECREASEALLOWANCE = 'decreaseAllowance'
}

export default class Token extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, bondCurrencyAddress: string) {

        const address = bondCurrencyAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Lend by purchasing bond token against other cash token  [callable by client] 
     * _sender is address of bond token redeemed, 
     * _receiver is bond token address,
     * _tokens is amount of tokens redeemed
     * @param (address _sender, address _receiver, uint256 _tokens) 
    * @returns bool
    */
    public async transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options)
    }

    /* Request bond token balance of wallet
    */
    public async balanceOf(_wallet: string, options?:{ gasPrice: number, gasLimit: number}): any {
        await this.validateInput(DATATYPES.ADDRESS, _wallet)
        return this.callContract(FUNCTIONS.BALANCE, _wallet, options)
    }

    /* Get address of issuer of token
    */
    public async getIssuer(): any {
        return this.callContract(FUNCTIONS.GETISSUER)
    }

    public async requestTransfer(_recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.REQUESTTRANSFER, _recieverAddress, _tokens, options)
    }

    public async requestTransaction(_amount: string, _payer: string, _collateralName: string, _collateralContract: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _payer)
        await this.validateInput(DATATYPES.STRING, _collateralName)
        await this.validateInput(DATATYPES.ADDRESS, _collateralContract)        
        return this.callContract(FUNCTIONS.REQUESTTRANSACTION, _amount, _payer, this.sanitiseInput(DATATYPES.BYTE32, _collateralName), _collateralContract, options)
    }

    public async name(): any {
        return this.callContract(FUNCTIONS.NAME)
    }

    public async symbol(): any {
        return this.callContract(FUNCTIONS.SYMBOL)
    }

    public async decimals(): any {
        return this.callContract(FUNCTIONS.DECIMALS)
    }

    public async totalSupply(): any {
        return this.callContract(FUNCTIONS.TOTALSUPPLY)
    }

    public async approve(_spender: string, _amount: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _spender)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        return this.callContract(FUNCTIONS.APPROVE, _spender, _amount, options)
    }

    public async allowance(_owner: string, _spender: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _spender)
        await this.validateInput(DATATYPES.ADDRESS, _owner)
        return this.callContract(FUNCTIONS.ALLOWANCE, _owner, _spender, options)
    }

    public async increaseAllowance(_spender: string, _addedValue: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _spender)
        await this.validateInput(DATATYPES.NUMBER, _addedValue)
        return this.callContract(FUNCTIONS.INCREASEALLOWANCE, _spender, _addedValue, options)
    }

    public async decreaseAllowance(_spender: string, _subtractedValue: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _spender)
        await this.validateInput(DATATYPES.NUMBER, _subtractedValue)
        return this.callContract(FUNCTIONS.DECREASEALLOWANCE, _spender, _subtractedValue, options)
    }

}