// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/custody/Vault.json';

enum FUNCTIONS {
    CREATEVAULT = 'createVault',
    GETCREATOR = 'getCreator',
    ADDPARTICIPANT = 'addParticipant',
    REMOVEPARTICIPANT = 'removeParticipant',
    CONFIRMPARTICIPANT = 'confirmParticipant',
    DEFINEQUORUM = 'defineQuorum',
    PROMPTSIGNATURES = 'promptSignatures',
    SIGNTRANSACTION = 'signTransaction',
    CHECKQUORUM = 'checkQuorum',
    GETSHARDS = 'getShards'
}

export default class CustodyContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {
        
        const chainId: string = Object.keys(networks)
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public async createVault(_creator: string, _id: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        return this.callContract(FUNCTIONS.CREATEVAULT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), options)
    }

    public async getCreator(_creator: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        return this.callContract(FUNCTIONS.GETCREATOR, this.sanitiseInput(DATATYPES.BYTE32, _creator), options)
    }

    public async addParticipant(_creator: string, _id: string, _participant: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        await this.validateInput(DATATYPES.STRING, _participant)
        return this.callContract(FUNCTIONS.ADDPARTICIPANT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), this.sanitiseInput(DATATYPES.BYTE32, _participant), options)
    }

    public async removeParticipant(_creator: string, _id: string, _participant: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        await this.validateInput(DATATYPES.STRING, _participant)
        return this.callContract(FUNCTIONS.REMOVEPARTICIPANT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), this.sanitiseInput(DATATYPES.BYTE32, _participant), options)
    }

    public async confirmParticipant(_creator: string, _participant: string, _id: string, _shard: string, _pin:string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        await this.validateInput(DATATYPES.STRING, _participant)
        await this.validateInput(DATATYPES.STRING, _shard)
        return this.callContract(FUNCTIONS.CONFIRMPARTICIPANT, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), this.sanitiseInput(DATATYPES.BYTE32, _id),  _shard, _pin, options)
    }

    public async defineQuorum(_creator: string, _id: string, _minParticipants:string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        return this.callContract(FUNCTIONS.DEFINEQUORUM, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), _minParticipants, options)
    }

    public async promptSignatures(_creator: string, _id: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        return this.callContract(FUNCTIONS.PROMPTSIGNATURES, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), options)
    }

    public async signTransaction(_creator: string, _participant: string, _id: string, _tx: string, _pin:string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        await this.validateInput(DATATYPES.STRING, _participant)
        return this.callContract(FUNCTIONS.SIGNTRANSACTION, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _participant), this.sanitiseInput(DATATYPES.BYTE32, _id),  _tx, _pin, options)
    }

    public async checkQuorum(_creator: string, _id: string, _participant: string, _txid: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        await this.validateInput(DATATYPES.STRING, _participant)
        await this.validateInput(DATATYPES.STRING, _txid)
        return this.callContract(FUNCTIONS.CHECKQUORUM, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), this.sanitiseInput(DATATYPES.BYTE32, _participant), this.sanitiseInput(DATATYPES.BYTE32, _txid), options)
    }

    public async getShards(_creator: string, _id: string, _txid: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _creator)
        await this.validateInput(DATATYPES.STRING, _id)
        await this.validateInput(DATATYPES.STRING, _txid)
        return this.callContract(FUNCTIONS.GETSHARDS, this.sanitiseInput(DATATYPES.BYTE32, _creator), this.sanitiseInput(DATATYPES.BYTE32, _id), this.sanitiseInput(DATATYPES.BYTE32, _txid), options)
    }

}