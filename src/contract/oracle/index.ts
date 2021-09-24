// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Oracle.json';

export default class OracleContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /*
        Watches and notifies event (LogResult) that is emitted when the Verified oracle fetches prices.
    */
    public async getCallback(eventName: string, callback: any) {
        await this.validateInput(DATATYPES.STRING, eventName)
        return this.getEvent(eventName, callback);
    }

}