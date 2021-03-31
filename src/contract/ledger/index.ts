// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/Ledger.json';
import { contractAddress } from '../../contractAddress/index';
import { CreateAccount } from '../../models/ledger';
import { DATATYPES } from "../index";

enum FUNCTIONS {
    CREATEACCOUNT = 'createAccount'
}

export default class LedgerContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].Ledger, JSON.stringify(abi), signer)
    }

    /**
     * Once the general ledgers are set up, accounts need to be created for each party that the issuer or investor transacts with. 
     * For example, a issuer can be a counter party for an investor. An investor who buys a bond from another investor will also 
     * become its counter party. Accounts need to be created using the following solidity function using the party/counterparty’s address
     * @param {address _account, bytes32 _currency} 
     * @returns {address}
     */
    public createAccount(_accountName: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.CREATEACCOUNT, this.sanitiseInput(DATATYPES.BYTE32, _accountName), this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }


}