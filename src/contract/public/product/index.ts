// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/assetmanager/Products.json';

enum FUNCTIONS {
    ISSUEPRODUCT = 'issueProduct',
    GETPRODUCTREFERENCE = 'getProductReference'
}

export default class VerifiedProducts extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = Object.keys(networks)
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async issueProduct(  issue: string, 
                                ref: string,
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, issue);
        await this.validateInput(DATATYPES.STRING, ref);
        return this.callContract(FUNCTIONS.ISSUEPRODUCT, issue, this.sanitiseInput(DATATYPES.BYTE32, ref), _hashedMessage, _v, _r, _s, options);
    } 
    
    public async getProductReference(  issue: string, 
                                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, issue);
        return this.callContract(FUNCTIONS.GETPRODUCTREFERENCE, issue, options);
    }

}