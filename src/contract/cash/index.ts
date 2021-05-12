// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Cash.json';

enum FUNCTIONS {
    TRANSFERFROM = 'transferFrom',
    PAYIN = 'payIn'
}

export default class CashContract extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * An investor can also request cash tokens from Verified by paying in another cash token. 
     * For example, an investor can request a USD cash token by paying in a EUR cash token.
     * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
     * and the tokens parameter is a numeric specifying number of cash tokens paid in.
     * @param (address sender, address _recieverAddress, uint256 tokens)
     * @returns boolean
     */
    public async transferFromUserToCash(_senderAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        // await this.validateInput(DATATYPES.STRING, _recieverAddress)
        await this.validateInput(DATATYPES.string, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, this.contractAddr, _tokens, options)
    }

    /**
    * An investor can also request cash tokens from Verified by paying in another cash token. 
    * For example, an investor can request a USD cash token by paying in a EUR cash token.
    * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
    * and the tokens parameter is a numeric specifying number of cash tokens paid in.
    * @param (address _senderAddress, address receiver, uint256 tokens)
    * @returns boolean
    */
    public async transferFromCashToUser(_recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        // await this.validateInput(DATATYPES.STRING, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.STRING, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, this.contractAddr, _recieverAddress, _tokens, options)
    }

    /**
    * An investor can also request cash tokens from Verified by paying in another cash token. 
    * For example, an investor can request a USD cash token by paying in a EUR cash token.
    * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
    * and the tokens parameter is a numeric specifying number of cash tokens paid in.
    * @param (address sender, address receiver, uint256 tokens)
    * @returns boolean
    */
    public async transferFromUserToUser(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.STRING, _recieverAddress)
        await this.validateInput(DATATYPES.STRING, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options)
    }

    /**
     * Request pay out [callable by manager]
     * @param (uint256 _tokens, address _payer, bytes32 _currency, address _sender)
     * @returns boolean
     */
    public async payIn(_tokens: string, _payer: string, _currency: string, _sender: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _tokens)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.ADDRESS, _sender)
        return this.callContract(FUNCTIONS.PAYIN, _tokens, _payer, this.sanitiseInput(DATATYPES.BYTE32, _currency), _sender, options)
    }
}