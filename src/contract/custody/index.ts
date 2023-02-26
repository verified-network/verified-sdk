// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/custody/Vault.json';

enum FUNCTIONS {
    CREATEVAULT = 'createVault',
    GETVAULTS = 'getVaults',
    TRANSFERVAULT = 'transferVault',
    GETCREATOR = 'getCreator',
    ADDPARTICIPANT = 'addParticipant',
    REMOVEPARTICIPANT = 'removeParticipant',
    CONFIRMPARTICIPANT = 'confirmParticipant',
    DEFINEQUORUM = 'defineQuorum',
    PROMPTSIGNATURES = 'promptSignatures',
    SIGNTRANSACTION = 'signTransaction',
    CHECKQUORUM = 'checkQuorum',
    GETSHARDS = 'getShards',
    NEWPARTICIPANT = 'NewParticipant',
    NEWTRANSACTION = 'NewTransaction',
    SIGNATURE = 'SignTransaction'
}

export default class Custody extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
        
        const address = contractNetworkAddress        
        //const chainId: string = Object.keys(networks)
        //const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async createVault(_creator: string, _id: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        return this.callContract(FUNCTIONS.CREATEVAULT, this.sanitiseInput(DATATYPES.BYTE32, _creator), _id, options)
    }

    public async getVaults() {
        return this.callContract(FUNCTIONS.GETVAULTS)
    }

    public async transferVault(_creator: string, _transferee: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.ADDRESS, _transferee)
        return this.callContract(FUNCTIONS.TRANSFERVAULT, this.sanitiseInput(DATATYPES.BYTE32, _creator), _transferee, options)
    }

    public async getCreator(_creator: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        return this.callContract(FUNCTIONS.GETCREATOR, this.sanitiseInput(DATATYPES.BYTE32, _creator), options)
    }

    public async addParticipant(_creator: string, _participant: string, _shard: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)        
        await this.validateInput(DATATYPES.STRING, _participant)
        await this.validateInput(DATATYPES.STRING, _shard)
        return this.callContract(FUNCTIONS.ADDPARTICIPANT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), _shard, options)
    }

    public async removeParticipant(_creator: string, _participant: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _participant)
        return this.callContract(FUNCTIONS.REMOVEPARTICIPANT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), options)
    }

    public async confirmParticipant(_creator: string, _participant: string, _pin:string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _participant)
        return this.callContract(FUNCTIONS.CONFIRMPARTICIPANT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), _pin, options)
    }

    public async defineQuorum(_creator: string, _minParticipants:string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.NUMBER, _minParticipants)
        return this.callContract(FUNCTIONS.DEFINEQUORUM, this.sanitiseInput(DATATYPES.BYTE32, _creator), _minParticipants, options)
    }

    public async promptSignatures(_creator: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        return this.callContract(FUNCTIONS.PROMPTSIGNATURES, this.sanitiseInput(DATATYPES.BYTE32, _creator), options)
    }

    public async signTransaction(_creator: string, _participant: string, _tx: string, _pin:string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _participant)
        return this.callContract(FUNCTIONS.SIGNTRANSACTION, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), _tx, _pin, options)
    }

    public async checkQuorum(_creator: string, _participant: string, _txid: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _participant)
        await this.validateInput(DATATYPES.STRING, _txid)
        return this.callContract(FUNCTIONS.CHECKQUORUM, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), _txid, options)
    }

    public async getShards(_creator: string, _txid: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _txid)
        return this.callContract(FUNCTIONS.GETSHARDS, this.sanitiseInput(DATATYPES.BYTE32, _creator), _txid, options)
    }

    public notifyNewParticipant(callback: any): object {
        this.getEvent(FUNCTIONS.NEWPARTICIPANT, callback);
    }

    public notifyNewTransaction(callback: any): object {
        this.getEvent(FUNCTIONS.NEWTRANSACTION, callback);
    }

    public notifySignTransaction(callback: any): object {
        this.getEvent(FUNCTIONS.SIGNATURE, callback);
    }

}