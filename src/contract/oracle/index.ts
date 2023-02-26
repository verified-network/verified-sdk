// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Oracle.json';

enum FUNCTIONS {
    RESULTRECEIVED = 'LogResult'
}

export default class OracleContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
        
        const address = contractNetworkAddress
        //const chainId: string = Object.keys(networks)
        //const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /*
        Watches and notifies event (LogResult) that is emitted when the Verified oracle fetches prices.
    */
    public notifyResult(callback: any): object {
        this.getEvent(FUNCTIONS.RESULTRECEIVED, callback)
    }

}