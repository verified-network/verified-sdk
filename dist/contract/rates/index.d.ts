import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Rates extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    setFeeTo(_feeTo: string, _fee: string, _feeType: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setFeeToSetter(_feeToSetter: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setCustodian(_custodian: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getFee(_feeType: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getFeeToSetter(): any;
    getCustodian(): any;
}
