// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/assetmanager/balancer/SecondaryIssueManager.json';

enum FUNCTIONS {
    ISSUESECONDARY = 'issueSecondary',
    GETSETTLEMENTREQUESTS = 'getSettlementRequests',
    GETSETTLEMENTREQUEST = 'getSettlementRequest',
    SETSETTLEMENTSTATUS = 'setSettlementStatus'
}

export default class SecondaryIssueManager extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = Object.keys(networks)
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async issueSecondary( 
        security: string, 
        currency:string, 
        securityAmount:string, 
        currencyAmount:string,
        _hashedMessage: string,
        _v: string,
        _r: string,
        _s: string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, securityAmount);
        await this.validateInput(DATATYPES.NUMBER, currencyAmount);
        return this.callContract(FUNCTIONS.ISSUESECONDARY, security, currency, securityAmount, currencyAmount, _hashedMessage, _v, _r, _s, options);
    }

    public async getSettlementRequests(dpid: string, poolid: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, dpid);
        await this.validateInput(DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUESTS, this.sanitiseInput(DATATYPES.BYTE32, dpid), this.sanitiseInput(DATATYPES.BYTE32, poolid), options);
    }

    public async getSettlementRequest(ref: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, ref);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, this.sanitiseInput(DATATYPES.BYTE32, ref), options);
    }

    public async setSettlementStatus(ref: string, status: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, ref);
        await this.validateInput(DATATYPES.STRING, status);
        return this.callContract(FUNCTIONS.SETSETTLEMENTSTATUS, this.sanitiseInput(DATATYPES.BYTE32, ref), 
            this.sanitiseInput(DATATYPES.BYTE32, status), options);
    }
}