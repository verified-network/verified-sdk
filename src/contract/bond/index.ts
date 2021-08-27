// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Bond.json';

enum FUNCTIONS {
    TRANSFERFROM = 'transferFrom',
    GETBONDISSUES = 'getBondIssues',
    GETBONDPURCHASES = 'getBondPurchases'
}

export default class BondContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, bondCurrencyAddress: string) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = bondCurrencyAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * For bond redemption, the following solidity function needs to be called. where, sender is the investor’s address, receiver is the issuing investor’s address, and tokens are numeric amount of bond tokens to redeem
     * @param (address _sender, address _receiver, uint256 _tokens) 
     * @returns 
     */
    public async transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options)
    }
    
    /**
    * Fetch bonds issued with their balance amounts to redeem [callable by client]
    * entries is count of results to return. Address[] has issued bond addresses, and uint[] has issued amount
    * @param ()
    * @returns (address[] memory, uint256[] memory)
    */
    public async getBondIssues() {
        return this.callContract(FUNCTIONS.GETBONDISSUES)
    }

    /**
    * Fetch bonds purchased with their purchased amounts [callable by client]
    * entries is count of results to return. Address[] has purchased bond addresses, and uint[] has purchased amount
    * @param ()
    * @returns (address[] memory, uint256[] memory)
    */
    public async getBondPurchases() {
        return this.callContract(FUNCTIONS.GETBONDPURCHASES)
    }

}