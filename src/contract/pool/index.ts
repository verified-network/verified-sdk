// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/assetmanager/Vault.json';

enum FUNCTIONS {
    FUNCTIONNAME = 'funcName'
}

export default class PoolContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, poolAddress: string) {

        const address = poolAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    //API below for single and batch swaps, and price and volume data from verified subgraphs for pool

}