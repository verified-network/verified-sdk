// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi,networks } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import { TransferFrom } from '../../models/cash';

enum FUNCTIONS {
    TRANSFERFROM = 'transferFrom',
}

export default class CashContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    /**
     * An investor can also request cash tokens from Verified by paying in another cash token. 
     * For example, an investor can request a USD cash token by paying in a EUR cash token.
     * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
     * and the tokens parameter is a numeric specifying number of cash tokens paid in.
     * @param (address sender, address receiver, uint256 tokens)
     * @returns boolean
     */
     public transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: number, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _senderAddress)
        await this.validateInput(DATATYPES.STRING, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options)
    }
}