// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import { TransferFrom } from '../../models/cash';

enum FUNCTIONS {
    TRANSFERFROM = 'transferFrom',
}

export default class CashContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].CashContract, JSON.stringify(abi), signer)
    }

    /**
     * An investor can also request cash tokens from Verified by paying in another cash token. 
     * For example, an investor can request a USD cash token by paying in a EUR cash token.
     * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
     * and the tokens parameter is a numeric specifying number of cash tokens paid in.
     * @param {address sender, address receiver, uint256 tokens} 
     * @returns {boolean}
     */
    public transferFrom(params: TransferFrom): any {
        return this.callContract(FUNCTIONS.TRANSFERFROM, params)
    }
}