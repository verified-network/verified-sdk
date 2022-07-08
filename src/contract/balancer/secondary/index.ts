// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/assetmanager/SecondaryIssueManager.json';

enum FUNCTIONS {
    ISSUESECONDARY = 'issueSecondary',
    GETSETTLEMENTREQUESTS = 'getSettlementRequests',
    GETSETTLEMENTREQUEST = 'getSettlementRequest',
    SETSETTLEMENTSTATUS = 'setSettlementStatus'
}

export default class BalancerSecondaryIssueManager extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet, platformAddress: string) {

        const address = platformAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async issueSecondary( 
                        security: string, 
                        currency:string, 
                        amount:string, 
                        id:string, 
                        //_hashedMessage: string,
                        //_v: string,
                        //_r: string,
                        //_s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.STRING, id);
        await this.validateInput(DATATYPES.NUMBER, amount);
        return this.callContract(FUNCTIONS.ISSUESECONDARY, security, currency, amount, this.sanitiseInput(DATATYPES.BYTE32, id),
                                    /*_hashedMessage, _v, _r, _s,*/ options);
    }

    public async getSettlementRequests(dpid: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, dpid);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUESTS, this.sanitiseInput(DATATYPES.BYTE32, dpid), options);
    }

    public async getSettlementRequest(ref: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, ref);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, this.sanitiseInput(DATATYPES.BYTE32, ref), options);
    }

    public async setSettlementStatus(ref: string, status: string, id: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, ref);
        await this.validateInput(DATATYPES.STRING, status);
        await this.validateInput(DATATYPES.STRING, id);
        return this.callContract(FUNCTIONS.SETSETTLEMENTSTATUS, this.sanitiseInput(DATATYPES.BYTE32, ref), 
            this.sanitiseInput(DATATYPES.BYTE32, status), this.sanitiseInput(DATATYPES.BYTE32, id), options);
    }

}