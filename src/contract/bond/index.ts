// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import {  RequestIssue } from '../../models/bond';

enum FUNCTIONS {
        REQUESTISSUE = 'requestIssue'
}

export default class BondContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    /**
     * Also, just as in the case of cash tokens, an investor can pay in a cash token and purchase bond tokens. 
     * For this, the solidity function to be called where, payer is the investor’s address, currency is cash token paid in, 
     * cashContract is the address of the cash token paid in, and amount is the numeric of amount in currency paid in.
     * @param {bytes16 amount, address payer, bytes32 currency, address cashContract} 
     * @returns {boolean}
     */
    public requestIssue(params: RequestIssue): any {
        return this.callContract(FUNCTIONS.REQUESTISSUE, params)
    }
}