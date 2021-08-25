// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Cash.json';

enum FUNCTIONS {
    TRANSFERFROM = 'transferFrom',
    PAYIN = 'payIn',
    BALANCE = 'balanceOf'
}

export default class CashContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, currencyAddress: string) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = currencyAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
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

    /**
     * Request pay out [callable by manager]
     * @param (uint256 _tokens, address _payer, bytes32 _currency, address _sender)
     * @returns boolean
     */
    public async payIn(_tokens: string, _payer: string, _currency: string, _sender: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.ADDRESS, _sender)
        return this.callContract(FUNCTIONS.PAYIN, _tokens, _payer, this.sanitiseInput(DATATYPES.BYTE32, _currency), _sender, options)
    }

    /* Request balance of wallet in contract
    */
    public async balanceOf(_wallet: string, options?:{ gasPrice: number, gasLimit: number}): any {
        await this.validateInput(DATATYPES.ADDRESS, _wallet)
        return this.callContract(FUNCTIONS.BALANCE, _wallet, options)
    }
}