// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/Client.json';
import { contractAddress } from '../../contractAddress/index';
import { Initialize,SetCustody,GetCustody,SetAccess,GetAccess,SetManager,GetManager ,IsRegistered,SetAMLStatus,GetAMLStatus,GetClients} from '../../models/client';

enum FUNCTIONS {
    INITIALIZE = 'initialize',
    SETCUSTODY = 'setCustody',
    GETCUSTODY = 'getCustody',
    SETACCESS = 'setAccess',
    GETACCESS = 'getAccess',
    SETMANAGER = 'setManager',
    GETMANAGER = 'getManager',
    ISREGISTERED = 'isRegistered',
    SETAMLSTATUS = 'setAMLStatus',
    GETAMLSTATUS = 'getAMLStatus',
    GETCLIENTS = 'getClients'
}

export default class ClientContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    public initialize(params: Initialize): any {
        return this.callContract(FUNCTIONS.INITIALIZE, params)
    }

    public setCustody(params: SetCustody): any {
        return this.callContract(FUNCTIONS.SETCUSTODY, params)
    }

    public getCustody(params: GetCustody): any {
        return this.callContract(FUNCTIONS.GETCUSTODY, params)
    }

    // function mentioned in the document to be integrated
    public setAccess(params: SetAccess): any {
        return this.callContract(FUNCTIONS.SETACCESS, params)
    }

    public getAccess(params: GetAccess): any {
        return this.callContract(FUNCTIONS.GETACCESS, params)
    }

    // function mentioned in the document to be integrated
    public setManager(params: SetManager): any {
        return this.callContract(FUNCTIONS.SETMANAGER, params)
    }

    // function mentioned in the document to be integrated
    public getManager(params: GetManager): any {
        return this.callContract(FUNCTIONS.GETMANAGER, params)
    }

    public isRegistered(params: IsRegistered): any {
        return this.callContract(FUNCTIONS.ISREGISTERED, params)
    }

    public setAMLStatus(params: SetAMLStatus): any {
        return this.callContract(FUNCTIONS.SETAMLSTATUS, params)
    }

    public getAMLStatus(params: GetAMLStatus): any {
        return this.callContract(FUNCTIONS.GETAMLSTATUS, params)
    }

    //
    public getClients(params: GetClients): any {
        return this.callContract(FUNCTIONS.GETCLIENTS, params)
    }

}