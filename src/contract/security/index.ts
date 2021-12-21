// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/Security.json';

enum FUNCTIONS {
    GETSETTLEMENTS = 'getSettlements',
    BALANCE = 'balanceOf'
}

export default class SecurityContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, tokenAddress: string) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = tokenAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async balanceOf(_wallet: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _wallet)
        return this.callContract(FUNCTIONS.BALANCE, this.sanitiseInput(DATATYPES.ADDRESS, _wallet), options)
    }

    /**
     * Fetches settlement registry for client account.
     * @param _client account address
     * @param options 
     * @returns settlement registry struct registry{
                                            address transferee;
                                            address transferor;
                                            uint256 amount;
                                            uint256 transferDateTime;
                                        }
     */
    public async getSettlements(_client: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _client)
        return this.callContract(FUNCTIONS.GETSETTLEMENTS, this.sanitiseInput(DATATYPES.ADDRESS, _client), options)
    }

}