import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Custody extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    createVault(_creator: string, _id: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getVaults(): any;
    transferVault(_creator: string, _id: string, _transferee: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getCreator(_creator: string, _pin: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    addParticipant(_creator: string, _id: string, _participant: string, _shard: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    removeParticipant(_creator: string, _id: string, _participant: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    confirmParticipant(_creator: string, _id: string, _participant: string, _pin: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    defineQuorum(_creator: string, _id: string, _minParticipants: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    promptSignatures(_creator: string, _id: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    signTransaction(_creator: string, _id: string, _participant: string, _tx: string, _pin: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    checkQuorum(_creator: string, _id: string, _participant: string, _txid: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getShards(_creator: string, _id: string, _txid: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifyNewParticipant(callback: any): object;
    notifyNewTransaction(callback: any): object;
    notifySignTransaction(callback: any): object;
}
